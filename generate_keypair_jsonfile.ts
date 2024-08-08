/**
 *  @author: Alex Jin
 */

import { Keypair } from "@solana/web3.js";
import base58 from 'bs58';
import * as fs from 'fs';

const PRIVATE_KEY = "Your PrivateKey";     // Your private key from phantom
const PUBLIC_KEY = "Your PublicKey";      // Type you public key from phantom
const secret = base58.decode(PRIVATE_KEY);

// Check if the ph is correct
const pair = Keypair.fromSecretKey(secret);

if (pair.publicKey.toString() == PUBLIC_KEY) {
    fs.writeFileSync(
        `${PUBLIC_KEY}`,
        JSON.stringify(Array.from(secret))
    );
}