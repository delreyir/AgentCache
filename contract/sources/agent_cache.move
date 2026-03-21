module agent_cache::marketplace {
    use std::signer;
    use std::string::String;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_std::table::{Self, Table};

    // Errors
    const E_NOT_INITIALIZED: u64 = 1;

    // L-Marketplace d bsse7
    struct MarketPlace has key {
        // Table kat-sjel: Buyer Address -> (Blob CID -> boolean)
        access_records: Table<address, Table<String, bool>>,
    }

    // HADI HIYA LI 9ADDINA: Khassha t-koun ghir 'fun' (private), machi 'public entry'
    fun init_module(admin: &signer) {
        move_to(admin, MarketPlace {
            access_records: table::new(),
        });
    }

    // L-khalass dyal l-Access
    public entry fun buy_access(
        buyer: &signer,
        seller: address,
        blob_cid: String,
        price_amount: u64
    ) acquires MarketPlace {
        let buyer_addr = signer::address_of(buyer);
        let marketplace = borrow_global_mut<MarketPlace>(@agent_cache);

        // 1. N-siftou l-flouss mn l-chari l-katib (Agent A)
        let payment = coin::withdraw<AptosCoin>(buyer, price_amount);
        coin::deposit<AptosCoin>(seller, payment);

        // 2. N-3tiwh l-Access f l-Blockchain
        if (!table::contains(&marketplace.access_records, buyer_addr)) {
            // ZEDNA '&mut' HNA BACH Y9BEL L-MODIFICATION
            table::add(&mut marketplace.access_records, buyer_addr, table::new<String, bool>());
        };
        
        let user_access = table::borrow_mut(&mut marketplace.access_records, buyer_addr);
        
        if (!table::contains(user_access, blob_cid)) {
            table::add(user_access, blob_cid, true);
        }
    }

    // Shelby kat-st3mel had l-function bach t-verifi wach l-user khlles d-bsse7
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