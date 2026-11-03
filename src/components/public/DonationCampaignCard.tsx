import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import React from "react";

export interface DonationCampaign {
  id: string;
  title: string;
  category: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  donorsCount: number;
  tag: string;
}

interface DonationCampaignCardProps {
  campaign: DonationCampaign;
  onDonateClick?: (campaign: DonationCampaign) => void;
}

export const DonationCampaignCard: React.FC<DonationCampaignCardProps> = ({
  campaign,
  onDonateClick,
}) => {
  const percentage = Math.min(
    100,
    Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)
  );

  const formatPKR = (amount: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs transition-all hover:border-brand-300 hover:shadow-theme-md dark:border-gray-800 dark:bg-gray-900">
      <div>
        <div className="flex items-center justify-between mb-3">
          <Badge color="success" size="sm">
            {campaign.category}
          </Badge>
          <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
            {campaign.tag}
          </span>
        </div>

        <h3 className="font-outfit text-xl font-bold text-gray-900 dark:text-white">
          {campaign.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {campaign.description}
        </p>

        {/* Progress Bar & Amount */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-gray-900 dark:text-white font-semibold">
              Raised: {formatPKR(campaign.raisedAmount)}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              Goal: {formatPKR(campaign.targetAmount)}
            </span>
          </div>

          {/* Styled Progress Bar */}
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-success-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 pt-1">
            <span>{percentage}% Funded</span>
            <span>{campaign.donorsCount} Donors Joined</span>
          </div>
        </div>
      </div>

      {/* Donate Action Button */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => onDonateClick?.(campaign)}
        >
          Contribute to this Cause
        </Button>
      </div>
    </div>
  );
};

export default DonationCampaignCard;

