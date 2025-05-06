const { ledger, createOffer, buyCredit } = require("../../smartcontracts/ledger");

module.exports = {
  createOffer: (installationId, kwh, pricePerKwh) => createOffer({ installationId, kwh, pricePerKwh }),
  buyCredit: (offerId, buyerId, kwh) => {
    const txId = buyCredit(offerId, buyerId, kwh);
    const offer = ledger.offers.find(o => o.id === offerId);
    return {
      txHash: `0x${txId.toString().padStart(64, "0")}`,
      totalPrice: kwh * offer.pricePerKwh
    };
  }
};
