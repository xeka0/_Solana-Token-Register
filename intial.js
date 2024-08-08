"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWalletKey = loadWalletKey;
var mpl = require("@metaplex-foundation/mpl-token-metadata");
var web3 = require("@solana/web3.js");
var anchor = require("@project-serum/anchor");
function loadWalletKey(keypairFile) {
    var fs = require("fs");
    var loaded = web3.Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())));
    return loaded;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var myKeypair, mint, seed1, seed2, seed3, _a, metadataPDA, _bump, accounts, dataV2, args, ix, tx, connection, txid;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("AGXT TOKEN NAME AND LOGO");
                    myKeypair = loadWalletKey("Your Keypiar");
                    console.log(myKeypair.publicKey.toBase58());
                    mint = new web3.PublicKey("Your Token Address");
                    seed1 = Buffer.from(anchor.utils.bytes.utf8.encode('metadata'));
                    seed2 = Buffer.from(mpl.PROGRAM_ID.toBytes());
                    seed3 = Buffer.from(mint.toBytes());
                    _a = web3.PublicKey.findProgramAddressSync([seed1, seed2, seed3], mpl.PROGRAM_ID), metadataPDA = _a[0], _bump = _a[1];
                    accounts = {
                        metadata: metadataPDA,
                        mint: mint,
                        mintAuthority: myKeypair.publicKey,
                        payer: myKeypair.publicKey,
                        updateAuthority: myKeypair.publicKey,
                    };
                    dataV2 = {
                        name: " Your Token Name",
                        symbol: " Your Token Symbol",
                        uri: "Image Url upload",
                        // we don't need that
                        sellerFeeBasisPoints: 0,
                        creators: null,
                        collection: null,
                        uses: null
                    };
                    args = {
                        createMetadataAccountArgsV2: {
                            data: dataV2,
                            isMutable: true
                        }
                    };
                    ix = mpl.createCreateMetadataAccountV2Instruction(accounts, args);
                    tx = new web3.Transaction();
                    tx.add(ix);
                    connection = new web3.Connection("https://api.mainnet-beta.solana.com");
                    return [4 /*yield*/, web3.sendAndConfirmTransaction(connection, tx, [myKeypair])];
                case 1:
                    txid = _b.sent();
                    console.log(txid);
                    return [2 /*return*/];
            }
        });
    });
}
main();
