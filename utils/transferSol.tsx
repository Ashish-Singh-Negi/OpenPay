import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  transact,
  Web3MobileWallet,
} from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { toByteArray } from "react-native-quick-base64";
import { Alert } from "react-native";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const APP_IDENTITY = {
  name: "OpenPay",
  uri: "openpay://",
  icon: "favicon.ico",
};
export async function transferSol(
  recipientAddress: string,
  amountInSol: number,
): Promise<string | null> {
  try {
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    const signature = await transact(async (wallet: Web3MobileWallet) => {
      Alert.alert("Step 1", "Inside transact");
      const authResult = await wallet.authorize({
        identity: APP_IDENTITY,
        cluster: "devnet",
      });

      Alert.alert(
        "Step 2",
        `Accounts: ${authResult.accounts?.length}\nFirst: ${JSON.stringify(authResult.accounts?.[0])}`,
      );
      if (!authResult.accounts || authResult.accounts.length === 0) {
        throw new Error("No accounts returned from wallet authorization.");
      }

      const fromPubkey = new PublicKey(
        toByteArray(authResult.accounts[1].address),
      );
      const toPubkey = new PublicKey(recipientAddress);
      Alert.alert("Step 3", `fromPubkey: ${fromPubkey.toBase58()}`);
      Alert.alert("Step 4", `Blockhash: ${blockhash}`);

      const instructions = [
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: amountInSol * LAMPORTS_PER_SOL,
        }),
      ];

      const messageV0 = new TransactionMessage({
        payerKey: fromPubkey,
        recentBlockhash: blockhash,
        instructions,
      }).compileToV0Message();

      const transaction = new VersionedTransaction(messageV0);

      const [sig] = await wallet.signAndSendTransactions({
        transactions: [transaction],
      });
      Alert.alert("Step 5", `Signature: ${signature}`);

      return sig;
    });

    const confirmation = await connection.confirmTransaction(
      { signature, blockhash, lastValidBlockHeight },
      "confirmed",
    );

    if (confirmation.value.err) {
      throw new Error("Transaction failed on-chain");
    }

    return signature;
  } catch (error: any) {
    if (error.code === 4001) {
      Alert.alert("Cancelled", "Transaction was cancelled.");
    } else if (error.code === -32603) {
      Alert.alert(
        "Failed",
        "Transaction simulation failed. Check your balance.",
      );
    } else {
      Alert.alert("Error", error.message);
      console.log(error);
    }
    return null;
  }
}
