/* Reference model: public Pan American calculator, captured 2026-10-17.
   This reproduces its estimate, not a verified customs tariff. */
function calculatePanAmerican(data, currentYear = new Date().getFullYear()) {
  const price = Number(data.price), engine = Number(data.engine), year = Number(data.year);
  if (!Number.isFinite(price) || price <= 0 || price > 1000000) throw new Error('Вкажіть вартість авто від 1 до 1 000 000 $.');
  if (!Number.isInteger(year) || year < 2000 || year > currentYear) throw new Error('Перевірте рік випуску.');
  if (!['petrol','diesel','hybrid','elec'].includes(data.fuel)) throw new Error('Оберіть тип палива.');
  if (data.fuel !== 'elec' && (!Number.isFinite(engine) || engine < .1 || engine > 10)) throw new Error('Вкажіть об’єм двигуна від 0,1 до 10 л.');
  const fee = price < 2000 ? 0 : price <= 2400 ? 515 : price <= 2500 ? 570 : price <= 3000 ? 610 : price <= 3500 ? 640 : price <= 4000 ? 700 : price <= 4500 ? 788 : price <= 5000 ? 850 : price <= 6000 ? 923 : price <= 7500 ? 950 : price <= 10000 ? 983 : price <= 15000 ? 1100 : price * .04 + 400;
  const auctionFee = Math.ceil(fee), auctionTotal = price + auctionFee;
  const customsBase = .93 * (auctionTotal + 1800);
  const rate = data.fuel === 'diesel' ? (engine <= 3.5 ? 75 : 150) : (engine <= 3 ? 50 : 100);
  const excise = rate * engine * Math.min(Math.max(currentYear - year, 1), 15) * 1.17;
  const customs = Math.ceil(data.fuel === 'elec' ? customsBase * .2 : customsBase * .1 + excise + .2 * (customsBase * 1.1 + excise));
  const services = price > 15000 ? 800 : 500, insurance = Math.ceil(Math.max(price * .02, 200));
  const groups = [
    {title:'Аукціон',items:[['Ціна купівлі авто',price],['Аукціонний збір',auctionFee]]},
    {title:'Доставка та послуги',items:[['Доставка в Клайпеду',1300],['Послуги Pan American',services],['Страхування',insurance],['Зберігання в США',185],['Експедиція',550]]},
    {title:'Витрати в Україні',items:[['Брокерські послуги',200],['Завантаження автомобіля',50],['Митні платежі (орієнтовно)',customs],['Доставка до Львова',850]]}
  ];
  for (const group of groups) group.total = group.items.reduce((sum,item)=>sum+item[1],0);
  return {auctionFee,auctionTotal,services,insurance,customs,groups,total:groups.reduce((sum,group)=>sum+group.total,0),feeUnspecified:price<2000};
}
if (typeof module !== 'undefined') module.exports = {calculatePanAmerican};
