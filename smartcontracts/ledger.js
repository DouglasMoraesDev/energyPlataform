let ledger = { offers: [], transactions: [] };

function createOffer({ installationId, kwh, pricePerKwh }) {
  const id = ledger.offers.length + 1;
  ledger.offers.push({ id, installationId, availableKwh: kwh, pricePerKwh });
  return id;
}

function buyCredit(offerId, buyerId, kwh) {
  const offer = ledger.offers.find(o => o.id === offerId);
  if (!offer || offer.availableKwh < kwh) throw new Error("Oferta inválida");
  offer.availableKwh -= kwh;
  const txId = ledger.transactions.length + 1;
  ledger.transactions.push({ id: txId, offerId, buyerId, kwh, timestamp: Date.now() });
  return txId;
}

module.exports = { ledger, createOffer, buyCredit };
