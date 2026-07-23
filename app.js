function linear(id, factor, symbol, th, en) {
  return { id, factor, symbol, names: { th, en } };
}
function temp(id, symbol, th, en, toBase, fromBase) {
  return { id, symbol, names: { th, en }, toBase, fromBase };
}

const C = {
  length: { n:{th:"ระยะทางและความยาว",en:"Length"}, d:["in","cm"], u:[
    linear("um",1e-6,"µm","ไมโครเมตร","Micrometer"), linear("mm",.001,"mm","มิลลิเมตร","Millimeter"),
    linear("cm",.01,"cm","เซนติเมตร","Centimeter"), linear("m",1,"m","เมตร","Meter"),
    linear("km",1000,"km","กิโลเมตร","Kilometer"), linear("in",.0254,"in","นิ้ว","Inch"),
    linear("ft",.3048,"ft","ฟุต","Foot"), linear("yd",.9144,"yd","หลา","Yard"),
    linear("mi",1609.344,"mi","ไมล์","Mile"), linear("nmi",1852,"nmi","ไมล์ทะเล","Nautical mile") ]},

  mass: { n:{th:"น้ำหนักและมวล",en:"Mass & weight"}, d:["kg","lb"], u:[
    linear("ug",1e-9,"µg","ไมโครกรัม","Microgram"), linear("mg",1e-6,"mg","มิลลิกรัม","Milligram"),
    linear("g",.001,"g","กรัม","Gram"), linear("kg",1,"kg","กิโลกรัม","Kilogram"),
    linear("t",1000,"t","ตันเมตริก","Metric tonne"), linear("oz",.028349523125,"oz","ออนซ์","Ounce"),
    linear("lb",.45359237,"lb","ปอนด์","Pound"), linear("st",6.35029318,"st","สโตน","Stone"),
    linear("shortton",907.18474,"US ton","ตันสหรัฐ","US short ton"), linear("longton",1016.0469088,"UK ton","ตันอังกฤษ","UK long ton") ]},

  temperature: { n:{th:"อุณหภูมิ",en:"Temperature"}, d:["c","f"], u:[
    temp("c","°C","องศาเซลเซียส","Celsius",v=>v,v=>v),
    temp("f","°F","องศาฟาเรนไฮต์","Fahrenheit",v=>(v-32)*5/9,v=>v*9/5+32),
    temp("k","K","เคลวิน","Kelvin",v=>v-273.15,v=>v+273.15),
    temp("r","°R","องศาแรงกิ้น","Rankine",v=>(v-491.67)*5/9,v=>(v+273.15)*9/5) ]},

  area: { n:{th:"พื้นที่",en:"Area"}, d:["sqm","sqft"], u:[
    linear("sqmm",1e-6,"mm²","ตารางมิลลิเมตร","Square millimeter"), linear("sqcm",1e-4,"cm²","ตารางเซนติเมตร","Square centimeter"),
    linear("sqm",1,"m²","ตารางเมตร","Square meter"), linear("sqkm",1e6,"km²","ตารางกิโลเมตร","Square kilometer"),
    linear("sqin",.00064516,"in²","ตารางนิ้ว","Square inch"), linear("sqft",.09290304,"ft²","ตารางฟุต","Square foot"),
    linear("sqyd",.83612736,"yd²","ตารางหลา","Square yard"), linear("sqmi",2589988.110336,"mi²","ตารางไมล์","Square mile"),
    linear("sqwah",4,"ตร.วา","ตารางวา","Square wah"), linear("ngan",400,"งาน","งาน","Ngan"),
    linear("rai",1600,"ไร่","ไร่","Rai"), linear("acre",4046.8564224,"acre","เอเคอร์","Acre"), linear("ha",10000,"ha","เฮกตาร์","Hectare") ]},

  volume: { n:{th:"ปริมาตร",en:"Volume"}, d:["l","usgal"], u:[
    linear("ml",.001,"mL","มิลลิลิตร","Milliliter"), linear("cl",.01,"cL","เซนติลิตร","Centiliter"),
    linear("dl",.1,"dL","เดซิลิตร","Deciliter"), linear("l",1,"L","ลิตร","Liter"),
    linear("cc",.001,"cm³","ลูกบาศก์เซนติเมตร","Cubic centimeter"), linear("m3",1000,"m³","ลูกบาศก์เมตร","Cubic meter"),
    linear("cuin",.016387064,"in³","ลูกบาศก์นิ้ว","Cubic inch"), linear("cuft",28.316846592,"ft³","ลูกบาศก์ฟุต","Cubic foot"),
    linear("tsp",.00492892159375,"tsp","ช้อนชา (สหรัฐ)","US teaspoon"), linear("tbsp",.01478676478125,"tbsp","ช้อนโต๊ะ (สหรัฐ)","US tablespoon"),
    linear("cup",.2365882365,"cup","ถ้วย (สหรัฐ)","US cup"), linear("usfloz",.0295735295625,"US fl oz","ฟลูอิดออนซ์ (สหรัฐ)","US fluid ounce"),
    linear("uspint",.473176473,"US pt","ไพนต์ (สหรัฐ)","US pint"), linear("usquart",.946352946,"US qt","ควอร์ต (สหรัฐ)","US quart"),
    linear("usgal",3.785411784,"US gal","แกลลอนสหรัฐ","US gallon"), linear("ukfloz",.0284130625,"UK fl oz","ฟลูอิดออนซ์ (อังกฤษ)","UK fluid ounce"),
    linear("ukpint",.56826125,"UK pt","ไพนต์ (อังกฤษ)","UK pint"), linear("ukgal",4.54609,"UK gal","แกลลอนอังกฤษ","UK gallon") ]},

  speed: { n:{th:"ความเร็ว",en:"Speed"}, d:["kmh","mph"], u:[
    linear("mps",1,"m/s","เมตรต่อวินาที","Meter per second"), linear("kmh",1/3.6,"km/h","กิโลเมตรต่อชั่วโมง","Kilometer per hour"),
    linear("mph",.44704,"mph","ไมล์ต่อชั่วโมง","Mile per hour"), linear("fps",.3048,"ft/s","ฟุตต่อวินาที","Foot per second"),
    linear("knot",1852/3600,"kn","นอต","Knot") ]},

  time: { n:{th:"เวลา",en:"Time"}, d:["hour","min"], u:[
    linear("ms",.001,"ms","มิลลิวินาที","Millisecond"), linear("sec",1,"s","วินาที","Second"),
    linear("min",60,"min","นาที","Minute"), linear("hour",3600,"h","ชั่วโมง","Hour"),
    linear("day",86400,"day","วัน","Day"), linear("week",604800,"week","สัปดาห์","Week") ]},

  data: { n:{th:"ข้อมูลดิจิทัล",en:"Digital data"}, d:["gb","mb"], u:[
    linear("bit",.125,"bit","บิต","Bit"), linear("byte",1,"B","ไบต์","Byte"),
    linear("kb",1e3,"KB","กิโลไบต์ (ฐานสิบ)","Kilobyte (decimal)"), linear("mb",1e6,"MB","เมกะไบต์ (ฐานสิบ)","Megabyte (decimal)"),
    linear("gb",1e9,"GB","กิกะไบต์ (ฐานสิบ)","Gigabyte (decimal)"), linear("tb",1e12,"TB","เทราไบต์ (ฐานสิบ)","Terabyte (decimal)"),
    linear("kib",1024,"KiB","กิบิไบต์","Kibibyte"), linear("mib",1024**2,"MiB","เมบิไบต์","Mebibyte"),
    linear("gib",1024**3,"GiB","กิบิไบต์","Gibibyte"), linear("tib",1024**4,"TiB","เทบิไบต์","Tebibyte") ]},

  angle: { n:{th:"มุม",en:"Angle"}, d:["deg","rad"], u:[
    linear("deg",Math.PI/180,"°","องศา","Degree"), linear("rad",1,"rad","เรเดียน","Radian"),
    linear("grad",Math.PI/200,"gon","เกรเดียน","Gradian"), linear("turn",Math.PI*2,"turn","รอบ","Turn") ]},

  pressure: { n:{th:"ความดัน",en:"Pressure"}, d:["bar","psi"], u:[
    linear("pa",1,"Pa","ปาสกาล","Pascal"), linear("kpa",1000,"kPa","กิโลปาสกาล","Kilopascal"),
    linear("mpa",1e6,"MPa","เมกะปาสกาล","Megapascal"), linear("bar",1e5,"bar","บาร์","Bar"),
    linear("mbar",100,"mbar","มิลลิบาร์","Millibar"), linear("atm",101325,"atm","บรรยากาศมาตรฐาน","Standard atmosphere"),
    linear("psi",6894.757293168,"psi","ปอนด์ต่อตารางนิ้ว","Pound per square inch"), linear("mmhg",133.322387415,"mmHg","มิลลิเมตรปรอท","Millimeter of mercury"),
    linear("torr",101325/760,"Torr","ทอร์","Torr") ]},

  energy: { n:{th:"พลังงาน",en:"Energy"}, d:["kwh","mj"], u:[
    linear("j",1,"J","จูล","Joule"), linear("kj",1000,"kJ","กิโลจูล","Kilojoule"),
    linear("mj",1e6,"MJ","เมกะจูล","Megajoule"), linear("wh",3600,"Wh","วัตต์-ชั่วโมง","Watt-hour"),
    linear("kwh",3.6e6,"kWh","กิโลวัตต์-ชั่วโมง","Kilowatt-hour"), linear("cal",4.184,"cal","แคลอรี","Calorie"),
    linear("kcal",4184,"kcal","กิโลแคลอรี","Kilocalorie"), linear("btu",1055.05585262,"BTU","บีทียู","British thermal unit"),
    linear("ftlb",1.3558179483314,"ft·lb","ฟุต-ปอนด์","Foot-pound") ]},

  power: { n:{th:"กำลัง",en:"Power"}, d:["kw","hp"], u:[
    linear("mwatt",.001,"mW","มิลลิวัตต์","Milliwatt"), linear("w",1,"W","วัตต์","Watt"),
    linear("kw",1000,"kW","กิโลวัตต์","Kilowatt"), linear("megawatt",1e6,"MW","เมกะวัตต์","Megawatt"),
    linear("hp",745.6998715822702,"hp","แรงม้า (กลไก)","Mechanical horsepower"), linear("ps",735.49875,"PS","แรงม้าเมตริก","Metric horsepower"),
    linear("btuh",.2930710701722222,"BTU/h","บีทียูต่อชั่วโมง","BTU per hour") ]},

  frequency: { n:{th:"ความถี่",en:"Frequency"}, d:["hz","rpm"], u:[
    linear("hz",1,"Hz","เฮิรตซ์","Hertz"), linear("khz",1e3,"kHz","กิโลเฮิรตซ์","Kilohertz"),
    linear("mhz",1e6,"MHz","เมกะเฮิรตซ์","Megahertz"), linear("ghz",1e9,"GHz","กิกะเฮิรตซ์","Gigahertz"),
    linear("rpm",1/60,"rpm","รอบต่อนาที","Revolutions per minute") ]},

  voltage: { n:{th:"แรงดันไฟฟ้า",en:"Voltage"}, d:["v","mv"], u:[
    linear("uv",1e-6,"µV","ไมโครโวลต์","Microvolt"), linear("mv",1e-3,"mV","มิลลิโวลต์","Millivolt"),
    linear("v",1,"V","โวลต์","Volt"), linear("kv",1e3,"kV","กิโลโวลต์","Kilovolt") ]},

  current: { n:{th:"กระแสไฟฟ้า",en:"Electric current"}, d:["a","ma"], u:[
    linear("ua",1e-6,"µA","ไมโครแอมแปร์","Microampere"), linear("ma",1e-3,"mA","มิลลิแอมแปร์","Milliampere"),
    linear("a",1,"A","แอมแปร์","Ampere"), linear("ka",1e3,"kA","กิโลแอมแปร์","Kiloampere") ]},

  resistance: { n:{th:"ความต้านทานไฟฟ้า",en:"Electrical resistance"}, d:["kohm","ohm"], u:[
    linear("mohm",1e-3,"mΩ","มิลลิโอห์ม","Milliohm"), linear("ohm",1,"Ω","โอห์ม","Ohm"),
    linear("kohm",1e3,"kΩ","กิโลโอห์ม","Kiloohm"), linear("megohm",1e6,"MΩ","เมกะโอห์ม","Megaohm"),
    linear("gohm",1e9,"GΩ","กิกะโอห์ม","Gigaohm") ]},

  battery: { n:{th:"ความจุแบตเตอรี่",en:"Battery capacity"}, d:["ah","mah"], u:[
    linear("uah",1e-6,"µAh","ไมโครแอมแปร์-ชั่วโมง","Microampere-hour"), linear("mah",1e-3,"mAh","มิลลิแอมแปร์-ชั่วโมง","Milliampere-hour"),
    linear("ah",1,"Ah","แอมแปร์-ชั่วโมง","Ampere-hour"), linear("kah",1e3,"kAh","กิโลแอมแปร์-ชั่วโมง","Kiloampere-hour") ]}
};

const T={
 th:{title:"แปลงหน่วย",category:"ประเภทหน่วย",amount:"จำนวน",from:"จาก",to:"เป็น",answer:"คำตอบ",swap:"สลับหน่วย",footer:"คำนวณบนอุปกรณ์ของคุณ ไม่มีการส่งข้อมูลออกจากเครื่อง",invalid:"กรุณาใส่ตัวเลข",showDetails:"ⓘ ดูรายละเอียด",mathValue:"ค่าทางคณิตศาสตร์",method:"วิธีคำนวณ"},
 en:{title:"Unit converter",category:"Category",amount:"Value",from:"From",to:"To",answer:"Answer",swap:"Swap units",footer:"Calculated on your device. No data is sent anywhere.",invalid:"Enter a number",showDetails:"ⓘ Show details",mathValue:"Mathematical value",method:"Calculation"}
};

const $=s=>document.querySelector(s), category=$("#category"), amount=$("#amount"), from=$("#fromUnit"), to=$("#toUnit"), result=$("#resultValue"), resultUnit=$("#resultUnit"), formula=$("#formulaText"), swap=$("#swapButton"), detailsPanel=$("#detailsPanel"), explanationText=$("#explanationText"), langButtons=[...document.querySelectorAll(".lang-button")];
let lang=localStorage.getItem("gukgu-language")||(navigator.language.toLowerCase().startsWith("th")?"th":"en");
let categoryId=localStorage.getItem("gukgu-category")||"length";
const cat=()=>C[categoryId];
const label=u=>`${u.names[lang]} (${u.symbol})`;

function fillCategories(){ category.replaceChildren(); Object.entries(C).forEach(([id,c])=>{const o=document.createElement("option");o.value=id;o.textContent=c.n[lang];category.append(o)}); category.value=categoryId; }
function fillUnits(reset=false){ const c=cat(), fv=reset?c.d[0]:from.value, tv=reset?c.d[1]:to.value; [from,to].forEach(s=>{s.replaceChildren();c.u.forEach(u=>{const o=document.createElement("option");o.value=u.id;o.textContent=label(u);s.append(o)})}); from.value=c.u.some(u=>u.id===fv)?fv:c.d[0]; to.value=c.u.some(u=>u.id===tv)?tv:c.d[1]; }
function fmt(n){ if(!Number.isFinite(n))return""; const a=Math.abs(n); if((a&&a<1e-7)||a>=1e15)return n.toExponential(8).replace(/\.?0+e/,"e"); return new Intl.NumberFormat(lang==="th"?"th-TH":"en-US",{maximumSignificantDigits:12,useGrouping:true}).format(n); }
function base(u,v){return u.toBase?u.toBase(v):v*u.factor} function out(u,v){return u.fromBase?u.fromBase(v):v/u.factor}

function humanTime(totalSeconds){
  if(!Number.isFinite(totalSeconds)) return "";
  const sign=totalSeconds<0?"−":"";
  let ms=Math.round(Math.abs(totalSeconds)*1000);
  const parts=[];
  const units=[
    [604800000,{th:"สัปดาห์",en:["week","weeks"]}],
    [86400000,{th:"วัน",en:["day","days"]}],
    [3600000,{th:"ชั่วโมง",en:["hour","hours"]}],
    [60000,{th:"นาที",en:["minute","minutes"]}],
    [1000,{th:"วินาที",en:["second","seconds"]}]
  ];
  for(const [size,name] of units){
    const value=Math.floor(ms/size);
    if(value){
      parts.push(lang==="th"?`${fmt(value)} ${name.th}`:`${fmt(value)} ${value===1?name.en[0]:name.en[1]}`);
      ms-=value*size;
    }
  }
  if(ms || parts.length===0){
    parts.push(lang==="th"?`${fmt(ms)} มิลลิวินาที`:`${fmt(ms)} ${ms===1?"millisecond":"milliseconds"}`);
  }
  return sign+parts.join(" ");
}


function isNearlyInteger(value){ return Math.abs(value-Math.round(value))<1e-9; }
function cleanRound(value, digits=9){
  const rounded=Number(value.toFixed(digits));
  return Math.abs(rounded)<1e-12?0:rounded;
}
function part(value, th, enSingular, enPlural=enSingular+"s"){
  if(!value) return "";
  return lang==="th"?`${fmt(value)} ${th}`:`${fmt(value)} ${Math.abs(value)===1?enSingular:enPlural}`;
}
function joinParts(parts){ return parts.filter(Boolean).join(" "); }

function breakdownMetric(total, sizes){
  const sign=total<0?"−":"";
  let remaining=Math.abs(total);
  const parts=[];
  sizes.forEach((item,index)=>{
    let value;
    if(index===sizes.length-1){ value=cleanRound(remaining/item.size,6); }
    else { value=Math.floor((remaining+1e-12)/item.size); remaining-=value*item.size; }
    if(value) parts.push(part(value,item.th,item.en,item.enPlural));
  });
  return sign+(parts.length?parts.join(" "):part(0,sizes[sizes.length-1].th,sizes[sizes.length-1].en,sizes[sizes.length-1].enPlural));
}

function smartAnswer(categoryId, baseValue, target){
  if(categoryId==="time"){
    return breakdownMetric(baseValue,[
      {size:604800,th:"สัปดาห์",en:"week"},{size:86400,th:"วัน",en:"day"},
      {size:3600,th:"ชั่วโมง",en:"hour"},{size:60,th:"นาที",en:"minute"},{size:1,th:"วินาที",en:"second"}
    ]);
  }
  if(categoryId==="length"){
    const imperial=["in","ft","yd","mi"];
    if(imperial.includes(target.id)){
      const inches=baseValue/0.0254;
      return breakdownMetric(inches,[
        {size:63360,th:"ไมล์",en:"mile"},{size:36,th:"หลา",en:"yard"},
        {size:12,th:"ฟุต",en:"foot",enPlural:"feet"},{size:1,th:"นิ้ว",en:"inch",enPlural:"inches"}
      ]);
    }
    if(target.id==="nmi") return `${fmt(out(target,baseValue))} ${target.names[lang]}`;
    return breakdownMetric(baseValue,[
      {size:1000,th:"กิโลเมตร",en:"kilometer"},{size:1,th:"เมตร",en:"meter"},
      {size:.01,th:"เซนติเมตร",en:"centimeter"},{size:.001,th:"มิลลิเมตร",en:"millimeter"}
    ]);
  }
  if(categoryId==="mass"){
    // แสดงน้ำหนักเป็นหน่วยปลายทางโดยตรง เช่น 6 kg = 13.23 lb
    const converted=out(target,baseValue);
    const absolute=Math.abs(converted);
    const digits=absolute>=1?2:absolute>=0.01?4:6;
    const displayed=cleanRound(converted,digits);
    return `${fmt(displayed)} ${target.names[lang]}`;
  }
  if(categoryId==="area"){
    const thai=["rai","ngan","sqwah"];
    if(thai.includes(target.id)){
      return breakdownMetric(baseValue,[
        {size:1600,th:"ไร่",en:"rai",enPlural:"rai"},{size:400,th:"งาน",en:"ngan",enPlural:"ngan"},
        {size:4,th:"ตารางวา",en:"square wah",enPlural:"square wah"},{size:1,th:"ตารางเมตร",en:"square meter"}
      ]);
    }
    return `${fmt(out(target,baseValue))} ${target.names[lang]}`;
  }
  if(categoryId==="volume"){
    const us=["tsp","tbsp","cup","usfloz","uspint","usquart","usgal"];
    const uk=["ukfloz","ukpint","ukgal"];
    if(us.includes(target.id)||uk.includes(target.id)) return `${fmt(out(target,baseValue))} ${target.names[lang]}`;
    return breakdownMetric(baseValue,[
      {size:1000,th:"ลูกบาศก์เมตร",en:"cubic meter"},{size:1,th:"ลิตร",en:"liter"},
      {size:.001,th:"มิลลิลิตร",en:"milliliter"}
    ]);
  }
  return `${fmt(out(target,baseValue))} ${target.names[lang]}`;
}

function explanation(categoryId,input,fromUnit,targetUnit,converted,answer){
  const equation=`${fmt(input)} ${fromUnit.symbol} = ${fmt(converted)} ${targetUnit.symbol}`;
  if(categoryId==="time"){
    const whole=Math.trunc(converted), fraction=Math.abs(converted-whole);
    if(!fraction) return lang==="th"?`${equation}\nคำตอบลงตัว จึงไม่ต้องแตกเป็นหน่วยย่อย`:`${equation}\nThe result is exact, so no smaller unit is needed.`;
    const rules={week:[7,"วัน","days"],day:[24,"ชั่วโมง","hours"],hour:[60,"นาที","minutes"],min:[60,"วินาที","seconds"],sec:[1000,"มิลลิวินาที","milliseconds"]};
    const rule=rules[targetUnit.id];
    if(rule){
      const smaller=cleanRound(fraction*rule[0],9);
      return lang==="th"?`${equation}\n${fmt(converted)} = ${fmt(whole)} + ${fmt(fraction)}\n${fmt(fraction)} × ${rule[0]} = ${fmt(smaller)} ${rule[1]}\nดังนั้น ${answer}`:`${equation}\n${fmt(converted)} = ${fmt(whole)} + ${fmt(fraction)}\n${fmt(fraction)} × ${rule[0]} = ${fmt(smaller)} ${rule[2]}\nTherefore: ${answer}`;
    }
  }
  const factorText=fromUnit.toBase||targetUnit.fromBase?equation:`${fmt(input)} × ${fmt(fromUnit.factor)} ÷ ${fmt(targetUnit.factor)} = ${fmt(converted)}`;
  if(categoryId==="mass"){
    return lang==="th"
      ? `${factorText}\nคำตอบหลักปัดทศนิยมให้อ่านง่ายเป็น: ${answer}`
      : `${factorText}\nThe main answer is rounded for readability: ${answer}`;
  }
  return lang==="th"?`${factorText}\nแสดงคำตอบแบบแตกหน่วยเป็น: ${answer}`:`${factorText}\nShown in an easier form as: ${answer}`;
}
function convert(){
  const v=Number(amount.value), c=cat(), f=c.u.find(u=>u.id===from.value), t=c.u.find(u=>u.id===to.value);
  if(!Number.isFinite(v)||!f||!t){
    result.textContent="—"; resultUnit.textContent=""; formula.textContent=T[lang].invalid; explanationText.textContent=""; return;
  }
  const baseValue=base(f,v), cv=out(t,baseValue);
  const smartCategories=["time","length","mass","area","volume"];
  const answer=smartCategories.includes(categoryId)?smartAnswer(categoryId,baseValue,t):`${fmt(cv)} ${t.names[lang]}`;
  result.textContent=answer;
  resultUnit.textContent="";
  formula.textContent=`${fmt(v)} ${f.symbol} = ${fmt(cv)} ${t.symbol}`;
  explanationText.textContent=explanation(categoryId,v,f,t,cv,answer);
}
function applyLanguage(l){lang=l;localStorage.setItem("gukgu-language",lang);document.documentElement.lang=lang;document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=T[lang][e.dataset.i18n]);document.querySelectorAll("[data-i18n-aria]").forEach(e=>e.setAttribute("aria-label",T[lang][e.dataset.i18nAria]));langButtons.forEach(b=>{const a=b.dataset.lang===lang;b.classList.toggle("is-active",a);b.setAttribute("aria-pressed",String(a))});document.title=lang==="th"?"gukgu — แปลงหน่วย":"gukgu — Unit converter";fillCategories();fillUnits(false);convert();}
category.addEventListener("change",()=>{categoryId=category.value;localStorage.setItem("gukgu-category",categoryId);fillUnits(true);convert()}); amount.addEventListener("input",convert);from.addEventListener("change",convert);to.addEventListener("change",convert);
swap.addEventListener("click",()=>{const v=Number(amount.value),c=cat(),f=c.u.find(u=>u.id===from.value),t=c.u.find(u=>u.id===to.value);if(Number.isFinite(v)&&f&&t)amount.value=Number(out(t,base(f,v)).toPrecision(12)).toString();[from.value,to.value]=[to.value,from.value];swap.classList.remove("is-swapping");void swap.offsetWidth;swap.classList.add("is-swapping");setTimeout(()=>swap.classList.remove("is-swapping"),220);convert()});langButtons.forEach(b=>b.addEventListener("click",()=>applyLanguage(b.dataset.lang)));
fillCategories();fillUnits(true);applyLanguage(lang);
