const IDENTITIES = {
  "10000001": { postcode: "94107", customer_name: "Jordan Rivera" },
  "10000002": { postcode: "10001", customer_name: "Sam Patel" }
};

export default function handler(req, res) {
  const { account_number, postcode, retry_count } = req.body || {};
  const currentRetryCount = typeof retry_count === "number" ? retry_count : 0;
  const nextRetryCount = currentRetryCount + 1;

  const record = IDENTITIES[account_number];

  if (!record || record.postcode !== postcode) {
    return res.status(200).json({ success: false, retry_count: nextRetryCount });
  }

  return res.status(200).json({
    success: true,
    customer_name: record.customer_name,
    account_number,
    retry_count: nextRetryCount
  });
}
