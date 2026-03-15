module agent_cache::marketplace {
    use std::signer;
    use std::string::String;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_std::table::{Self, Table};

    /// Errors
    const E_NOT_INITIALIZED: u64 = 1;
    const E_ALREADY_INITIALIZED: u64 = 2;

    /// The main marketplace struct stored under the admin's account
    struct MarketPlace has key {
        // Table storing access rights: Buyer Address -> (Blob CID -> boolean)
        access_records: Table<address, Table<String, bool>>,
    }

    /// Initialize the marketplace (called once upon deployment)
    public entry fun init_module(admin: &signer) {
        if (exists<MarketPlace>(signer::address_of(admin))) {
            abort E_ALREADY_INITIALIZED;
        };

        move_to(admin, MarketPlace {
            access_records: table::new(),
        });
    }

    /// Buy access to a specific dataset/blob
    public entry fun buy_access(
        buyer: &signer,
        seller: address,
        blob_cid: String,
        price_amount: u64
    ) acquires MarketPlace {
        if (!exists<MarketPlace>(@agent_cache)) {
            abort E_NOT_INITIALIZED;
        };

        let buyer_addr = signer::address_of(buyer);
        let marketplace = borrow_global_mut<MarketPlace>(@agent_cache);

        // 1. Transfer funds from buyer to seller (micro-transaction)
        let payment = coin::withdraw<AptosCoin>(buyer, price_amount);
        coin::deposit<AptosCoin>(seller, payment);

        // 2. Grant access in the state table
        if (!table::contains(&marketplace.access_records, buyer_addr)) {
            table::add(&mut marketplace.access_records, buyer_addr, table::new<String, bool>());
        };

        let user_access = table::borrow_mut(&mut marketplace.access_records, buyer_addr);

        // Ensure we do not overwrite if already bought
        if (!table::contains(user_access, blob_cid)) {
            table::add(user_access, blob_cid, true);
        }
    }

    /// Read-only function called by Shelby RPC to verify if a user paid
    #[view]
    public fun check_access(buyer: address, blob_cid: String): bool acquires MarketPlace {
        if (!exists<MarketPlace>(@agent_cache)) {
            return false;
        };

        let marketplace = borrow_global<MarketPlace>(@agent_cache);
        if (!table::contains(&marketplace.access_records, buyer)) {
            return false;
        };

        let user_access = table::borrow(&marketplace.access_records, buyer);
        table::contains(user_access, blob_cid)
    }
}
