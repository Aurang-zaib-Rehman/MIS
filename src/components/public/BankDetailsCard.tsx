import { CheckCircleIcon, CopyIcon } from "@/icons";
import React, { useState } from "react";

export const BankDetailsCard: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const accounts = [
    {
      channel: "Meezan Bank (Islamic Banking)",
      title: "Madrasa Uloom-e-Islamia Trust",
      accountNo: "0102030405060708",
      iban: "PK36MEZN0001020304050607",
      branch: "Mardan Main Branch (Branch Code: 0102)",
    },
    {
      channel: "Bank Islami Pakistan",
      title: "Jamia Uloom-e-Islamia Zakat & Sadaqah Fund",
      accountNo: "1029384756019283",
      iban: "PK44BKIP0010293847560192",
      branch: "Swat City Branch",
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-theme-md sm:p-8 dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 pb-5 dark:border-gray-800">
        <span className="rounded-full bg-success-50 px-3 py-1 text-xs font-semibold text-success-600 dark:bg-success-500/15 dark:text-success-400">
          Transparent &amp; Verified Accounts
        </span>
        <h3 className="mt-2 font-outfit text-2xl font-bold text-gray-900 dark:text-white">
          Official Bank Account &amp; Wire Transfer Details
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          All financial contributions are audited annually and utilized in full compliance with Shariah
          stipulations. Please send donation receipt on WhatsApp for formal verification.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {accounts.map((acc, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 dark:border-gray-700/60 dark:bg-white/3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-outfit font-bold text-gray-900 dark:text-white">
                {acc.channel}
              </h4>
              <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                Official Account
              </span>
            </div>

            <div className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <div>
                <span className="block text-[11px] text-gray-500 dark:text-gray-400">
                  Account Title
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {acc.title}
                </span>
              </div>

              <div>
                <span className="block text-[11px] text-gray-500 dark:text-gray-400">
                  Account Number
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-gray-800 dark:text-gray-200">
                    {acc.accountNo}
                  </span>
                  <button
                    onClick={() => copyToClipboard(acc.accountNo, acc.accountNo)}
                    className="inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 dark:text-brand-400"
                  >
                    {copiedField === acc.accountNo ? (
                      <span className="flex items-center gap-1 text-success-600">
                        <CheckCircleIcon className="size-3.5" /> Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <CopyIcon className="size-3.5" /> Copy
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-[11px] text-gray-500 dark:text-gray-400">
                  IBAN (International Wire Transfers)
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-gray-800 dark:text-gray-200">
                    {acc.iban}
                  </span>
                  <button
                    onClick={() => copyToClipboard(acc.iban, acc.iban)}
                    className="inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 dark:text-brand-400"
                  >
                    {copiedField === acc.iban ? (
                      <span className="flex items-center gap-1 text-success-600">
                        <CheckCircleIcon className="size-3.5" /> Copied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <CopyIcon className="size-3.5" /> Copy
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                <span>{acc.branch}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Wallets & WhatsApp Proof */}
      <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50/50 p-5 dark:border-brand-900/40 dark:bg-brand-950/20">
        <h4 className="font-outfit font-bold text-brand-900 dark:text-brand-200 text-sm sm:text-base">
          EasyPaisa &amp; JazzCash Direct Accounts
        </h4>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs sm:text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">EasyPaisa Account:</span>
            <p className="font-mono font-bold text-gray-900 dark:text-white">
              0302 9558584 <span className="font-normal text-xs text-gray-500">(Aurang Zaib)</span>
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">JazzCash Account:</span>
            <p className="font-mono font-bold text-gray-900 dark:text-white">
              0301 9416781 <span className="font-normal text-xs text-gray-500">(Haseeb Khan)</span>
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-brand-800 dark:text-brand-300">
          After completing your transaction, please send a screenshot or receipt on WhatsApp to{" "}
          <strong className="font-mono">+92 302 9558584</strong> to receive an official digital acknowledgment receipt.
        </p>
      </div>
    </div>
  );
};

export default BankDetailsCard;

