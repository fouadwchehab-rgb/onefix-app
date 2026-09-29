import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Alert, Image, Linking, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { CatalogItem, Language, serviceCatalog, serviceItems } from "./src/catalogue";
import { imageRegistry } from "./src/imageRegistry";

const navy = "#122b3e"; const navy2 = "#193548"; const brass = "#e7ab69"; const cream = "#fcfaf6"; const ink = "#193247"; const muted = "#71807f"; const whatsappNumber = "96171293909";
const copy = {
  en: { navServices: "Services", navBook: "Book", navContact: "Contact", eyebrow: "PROPERTY SERVICES & MANAGEMENT", heroTitle: "One WhatsApp.\nOne solution.", heroText: "Fast, thoughtful property care from experienced, vetted technicians across Lebanon.", start: "Start with WhatsApp", browse: "Browse services", servicesEyebrow: "WHAT WE DO", servicesTitle: "The essential work your property needs.", servicesText: "Choose a service, check reference prices and start with one WhatsApp conversation.", activity: "Activity", check: "Check prices", priceList: "Activity price list", close: "Close", request: "Request on WhatsApp", disclaimer: "Reference starting prices for manpower only. Materials, complexity, and final scope may change the quote.", how: "How it works", howText: "Send a message, photo, video or voice note. We take it from there.", ready: "Something needs fixing?", readyText: "Tell us what your property needs and we will help you take the next step.", booking: "Book a service", name: "Your name", phone: "Phone number", location: "Property location", service: "Choose a service", timing: "Preferred time", details: "What do you need help with?", submit: "Continue on WhatsApp", required: "Please complete your name, phone, location, service and details.", asap: "As soon as possible", morning: "Morning", afternoon: "Afternoon", evening: "Evening", contact: "Onefix, by Viprojects", address: "General Chehab Street 61, Building 100, Furn El Chebbak, Beirut – Lebanon", call: "Call Onefix", whatsapp: "WhatsApp Onefix", language: "العربية" },
  ar: { navServices: "الخدمات", navBook: "احجز", navContact: "تواصل معنا", eyebrow: "خدمات وإدارة العقارات", heroTitle: "واتساب واحد.\nحل واحد.", heroText: "عناية سريعة ومدروسة بالعقارات مع فنيين ذوي خبرة وموثوقين في معظم مناطق لبنان.", start: "ابدأ عبر واتساب", browse: "تصفح الخدمات", servicesEyebrow: "ماذا نقدم", servicesTitle: "كل ما يحتاجه عقارك من أعمال أساسية.", servicesText: "اختر الخدمة وتحقق من الأسعار المرجعية وابدأ بمحادثة واتساب واحدة.", activity: "خدمة", check: "تحقق من الأسعار", priceList: "قائمة أسعار الخدمة", close: "إغلاق", request: "اطلب عبر واتساب", disclaimer: "الأسعار الابتدائية المرجعية للعمالة فقط. قد تختلف الكلفة بحسب المواد والتعقيد ونطاق العمل النهائي.", how: "كيف نعمل", howText: "أرسل رسالة أو صورة أو فيديو أو مقطعاً صوتياً. ونحن نتولى الباقي.", ready: "هل يحتاج شيء إلى إصلاح؟", readyText: "أخبرنا بما يحتاجه عقارك وسنساعدك في الخطوة التالية.", booking: "احجز خدمة", name: "الاسم", phone: "رقم الهاتف", location: "موقع العقار", service: "اختر الخدمة", timing: "الوقت المفضل", details: "بماذا يمكننا مساعدتك؟", submit: "تابع عبر واتساب", required: "يرجى تعبئة الاسم والهاتف والموقع والخدمة والتفاصيل.", asap: "في أقرب وقت", morning: "صباحاً", afternoon: "بعد الظهر", evening: "مساءً", contact: "Onefix، بإدارة Viprojects", address: "شارع جنرال شهاب 61، مبنى 100، فرن الشباك، بيروت - لبنان", call: "اتصل بـ Onefix", whatsapp: "واتساب Onefix", language: "EN" }
} as const;
function openWhatsApp(message: string) { Linking.openURL(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`); }
function Brand() { return <View style={styles.brandRow}><View style={styles.logoBox}><Text style={styles.logoNumber}>1</Text></View><View><Text style={styles.brandName}>ONEFIX</Text><Text style={styles.brandSub}>BY VIPROJECTS</Text></View></View>; }
function ActionButton({ label, onPress, dark = false }: { label: string; onPress: () => void; dark?: boolean }) { return <Pressable onPress={onPress} style={({ pressed }) => [styles.actionButton, dark && styles.actionButtonDark, pressed && styles.pressed]}><Text style={[styles.actionText, dark && styles.actionTextLight]}>{label}  ↗</Text></Pressable>; }
export default function App() {
  const [language, setLanguage] = useState<Language>("en"); const [selectedService, setSelectedService] = useState<(typeof serviceItems)[number] | null>(null); const [bookingData, setBookingData] = useState({ name: "", phone: "", location: "", service: "", timing: "", details: "" }); const [submitted, setSubmitted] = useState(false); const t = copy[language]; const ar = language === "ar"; const selectedItems: CatalogItem[] = useMemo(() => selectedService ? (serviceCatalog[selectedService.en] || []) : [], [selectedService]);
  const update = (key: keyof typeof bookingData, value: string) => setBookingData((current) => ({ ...current, [key]: value }));
  const submitBooking = () => { if (!bookingData.name.trim() || !bookingData.phone.trim() || !bookingData.location.trim() || !bookingData.service || !bookingData.details.trim()) { Alert.alert(ar ? "معلومات ناقصة" : "Missing information", t.required); return; } const message = ar ? `مرحباً Onefix، أريد حجز خدمة.\nالاسم: ${bookingData.name}\nالهاتف: ${bookingData.phone}\nالخدمة: ${bookingData.service}\nالموقع: ${bookingData.location}\nالوقت: ${bookingData.timing || "في أقرب وقت"}\nالتفاصيل: ${bookingData.details}` : `Hello Onefix, I would like to book a service.\nName: ${bookingData.name}\nPhone: ${bookingData.phone}\nService: ${bookingData.service}\nLocation: ${bookingData.location}\nPreferred time: ${bookingData.timing || "As soon as possible"}\nDetails: ${bookingData.details}`; setSubmitted(true); openWhatsApp(message); };
  return <SafeAreaView style={styles.safe}><StatusBar style="light" /><ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
    <View style={styles.header}><Brand /><Pressable onPress={() => setLanguage(ar ? "en" : "ar")} style={styles.languageButton}><Text style={styles.languageText}>{t.language}</Text></Pressable></View>
    <View style={styles.hero}><Image source={imageRegistry["./assets/onefix-property-hero.jpg"]} style={styles.heroImage} /><View style={styles.heroShade} /><View style={styles.heroContent}><Text style={styles.eyebrow}>{t.eyebrow}</Text><Text style={[styles.heroTitle, ar && styles.rtlText]}>{t.heroTitle}</Text><Text style={[styles.heroText, ar && styles.rtlText]}>{t.heroText}</Text><View style={styles.heroActions}><ActionButton label={t.start} onPress={() => openWhatsApp(ar ? "مرحباً Onefix، أحتاج إلى خدمة للعقار." : "Hello Onefix, I need help with a property service.")} /><ActionButton label={t.browse} dark onPress={() => {}} /></View></View></View>
    <View style={styles.sectionLight}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionEyebrow}>{t.servicesEyebrow}</Text>
        <Text style={[styles.sectionTitle, ar && styles.rtlText]}>{t.servicesTitle}</Text>
        <Text style={[styles.sectionText, ar && styles.rtlText]}>{t.servicesText}</Text>
        <View style={styles.serviceGrid}>
          {serviceItems.map((service) => (
            <Pressable key={service.en} onPress={() => setSelectedService(service)} style={({ pressed }) => [styles.serviceCard, service.special && styles.specialCard, pressed && styles.cardPressed]}>
              <Image source={imageRegistry[service.image]} style={styles.serviceImage} />
              <View style={styles.serviceBody}>
                <Text style={styles.cardEyebrow}>{service.special ? (ar ? "خدمة مميزة" : "HIGHLIGHTED") : t.activity}</Text>
                <Text style={[styles.serviceName, ar && styles.rtlText]}>{ar ? service.ar : service.en}</Text>
                <Text style={[styles.serviceDescription, ar && styles.rtlText]} numberOfLines={3}>{service.text[language]}</Text>
                <Text style={[styles.checkLink, ar && styles.rtlText]}>{t.check}  ›</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
    <View style={styles.darkSection}><Text style={styles.sectionEyebrow}>{t.how}</Text><Text style={[styles.darkTitle, ar && styles.rtlText]}>{t.howText}</Text>{["01", "02", "03", "04"].map((number, index) => { const labels = ar ? ["راسلنا", "نفهم طلبك", "ننسّق لك", "يُنجز العمل"] : ["Message us", "We understand", "We connect", "The work gets done"]; return <View style={styles.step} key={number}><Text style={styles.stepNumber}>{number}</Text><Text style={[styles.stepLabel, ar && styles.rtlText]}>{labels[index]}</Text></View>; })}</View>
    <View style={styles.bookingSection}><Text style={styles.sectionEyebrow}>{t.booking}</Text><Text style={[styles.sectionTitle, ar && styles.rtlText]}>{t.ready}</Text><Text style={[styles.sectionText, ar && styles.rtlText]}>{t.readyText}</Text><View style={styles.formCard}><Field label={t.name} value={bookingData.name} onChangeText={(v) => update("name", v)} ar={ar} /><Field label={t.phone} value={bookingData.phone} onChangeText={(v) => update("phone", v)} keyboardType="phone-pad" ar={ar} /><Field label={t.location} value={bookingData.location} onChangeText={(v) => update("location", v)} ar={ar} /><Text style={[styles.fieldLabel, ar && styles.rtlText]}>{t.service}</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.choiceRow}>{serviceItems.map((service) => <Pressable key={service.en} onPress={() => update("service", ar ? service.ar : service.en)} style={[styles.choice, bookingData.service === (ar ? service.ar : service.en) && styles.choiceActive]}><Text style={[styles.choiceText, bookingData.service === (ar ? service.ar : service.en) && styles.choiceTextActive]}>{ar ? service.ar : service.en}</Text></Pressable>)}</ScrollView><Text style={[styles.fieldLabel, ar && styles.rtlText]}>{t.timing}</Text><View style={styles.choiceRow}>{([t.asap, t.morning, t.afternoon, t.evening] as string[]).map((time) => <Pressable key={time} onPress={() => update("timing", time)} style={[styles.choice, bookingData.timing === time && styles.choiceActive]}><Text style={[styles.choiceText, bookingData.timing === time && styles.choiceTextActive]}>{time}</Text></Pressable>)}</View><Text style={[styles.fieldLabel, ar && styles.rtlText]}>{t.details}</Text><TextInput value={bookingData.details} onChangeText={(v) => update("details", v)} multiline numberOfLines={4} placeholder={t.details} placeholderTextColor="#9aa3a2" style={[styles.input, styles.detailsInput, ar && styles.rtlText]} /><ActionButton label={submitted ? (ar ? "افتح واتساب مجدداً" : "Open WhatsApp again") : t.submit} onPress={submitBooking} /></View></View>
    <View style={styles.contactSection}><Brand /><Text style={[styles.contactTitle, ar && styles.rtlText]}>{t.contact}</Text><Text style={[styles.contactAddress, ar && styles.rtlText]}>{t.address}</Text><View style={styles.contactActions}><ActionButton label={t.whatsapp} onPress={() => openWhatsApp(ar ? "مرحباً Onefix، أحتاج إلى خدمة للعقار." : "Hello Onefix, I need help with a property service.")} /><ActionButton label={t.call} dark onPress={() => Linking.openURL("tel:+96171293909")} /></View><Text style={styles.footer}>© 2026 ONEFIX · BY VIPROJECTS</Text></View>
  </ScrollView>
  <Modal visible={!!selectedService} animationType="slide" transparent onRequestClose={() => setSelectedService(null)}><View style={styles.modalBackdrop}><View style={styles.modalCard}><View style={styles.modalHeader}><View style={{ flex: 1 }}><Text style={styles.sectionEyebrow}>{t.priceList}</Text><Text style={[styles.modalTitle, ar && styles.rtlText]}>{selectedService && (ar ? selectedService.ar : selectedService.en)}</Text></View><Pressable onPress={() => setSelectedService(null)} style={styles.closeButton}><Text style={styles.closeText}>×</Text></Pressable></View><Text style={[styles.disclaimer, ar && styles.rtlText]}>{t.disclaimer}</Text><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalList}>{selectedItems.map((item) => <View key={item.name.en} style={styles.itemRow}><Image source={imageRegistry[item.image]} style={styles.itemImage} /><View style={styles.itemCopy}><Text style={[styles.itemName, ar && styles.rtlText]}>{item.name[language]}</Text><Text style={[styles.itemDetail, ar && styles.rtlText]}>{item.detail[language]}</Text></View><View style={styles.itemPriceBox}><Text style={styles.itemPrice}>{item.price[language]}</Text><Pressable onPress={() => openWhatsApp(ar ? `مرحباً Onefix، أريد طلب ${item.name.ar}.` : `Hello Onefix, I would like to request ${item.name.en}.`)}><Text style={styles.requestLink}>{t.request}</Text></Pressable></View></View>)}</ScrollView></View></View></Modal></SafeAreaView>;
}
function Field({ label, value, onChangeText, keyboardType, ar }: { label: string; value: string; onChangeText: (value: string) => void; keyboardType?: "phone-pad"; ar: boolean }) { return <View><Text style={[styles.fieldLabel, ar && styles.rtlText]}>{label}</Text><TextInput value={value} onChangeText={onChangeText} keyboardType={keyboardType} placeholder={label} placeholderTextColor="#9aa3a2" style={[styles.input, ar && styles.rtlText]} /></View>; }

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: navy },
  scroll: { backgroundColor: navy },
  header: { minHeight: 76, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: navy },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 9 },
  logoBox: { width: 36, height: 36, borderRadius: 11, backgroundColor: brass, alignItems: "center", justifyContent: "center" },
  logoNumber: { color: navy, fontSize: 18, fontWeight: "800" },
  brandName: { color: "white", fontWeight: "900", fontSize: 17, letterSpacing: -1 },
  brandSub: { color: "rgba(255,255,255,.65)", fontSize: 8, letterSpacing: 1.4, marginTop: 3 },
  languageButton: { borderWidth: 1, borderColor: "rgba(255,255,255,.25)", borderRadius: 20, paddingHorizontal: 13, paddingVertical: 8 },
  languageText: { color: "white", fontSize: 12 },
  hero: { minHeight: 500, position: "relative", overflow: "hidden" },
  heroImage: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", resizeMode: "cover" },
  heroShade: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(10,34,50,.78)" },
  heroContent: { paddingHorizontal: 22, paddingTop: 82, paddingBottom: 42, maxWidth: 1200, alignSelf: "center", width: "100%" },
  eyebrow: { color: brass, fontSize: 10, letterSpacing: 1.5, fontWeight: "700", marginBottom: 18 },
  heroTitle: { color: "white", fontSize: 45, lineHeight: 46, fontWeight: "300", letterSpacing: -1.6 },
  heroText: { color: "rgba(255,255,255,.78)", fontSize: 15, lineHeight: 23, marginTop: 20, maxWidth: 360 },
  heroActions: { flexDirection: "row", gap: 10, marginTop: 28, flexWrap: "wrap" },
  actionButton: { backgroundColor: brass, borderRadius: 24, paddingHorizontal: 17, paddingVertical: 13, alignSelf: "flex-start" },
  actionButtonDark: { backgroundColor: "transparent", borderWidth: 1, borderColor: "rgba(255,255,255,.35)" },
  actionText: { color: navy, fontSize: 12, fontWeight: "600" },
  actionTextLight: { color: "white" },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  sectionLight: { backgroundColor: cream, paddingHorizontal: 18, paddingTop: 38, paddingBottom: 44, alignItems: "center" },
  sectionContainer: { width: "100%", maxWidth: 1100 },
  sectionEyebrow: { color: "#b87039", fontSize: 10, letterSpacing: 1.5, fontWeight: "700", marginBottom: 12 },
  sectionTitle: { color: ink, fontSize: 29, lineHeight: 32, fontWeight: "700", letterSpacing: -0.8 },
  sectionText: { color: muted, fontSize: 14, lineHeight: 21, marginTop: 13 },
  serviceGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 16, marginTop: 24 },
  serviceCard: { flex: 1, minWidth: 280, maxWidth: 340, backgroundColor: "white", borderRadius: 16, marginBottom: 14, overflow: "hidden", borderWidth: 1, borderColor: "#ece8df" },
  specialCard: { backgroundColor: "#f1e0bd", borderColor: "#e7c98d" },
  cardPressed: { opacity: 0.78 },
  serviceImage: { width: "100%", height: 210, resizeMode: "cover" },
  serviceBody: { padding: 14 },
  cardEyebrow: { color: "#b87039", fontSize: 8, letterSpacing: 1, fontWeight: "700" },
  serviceName: { color: ink, fontSize: 15, lineHeight: 19, fontWeight: "600", marginTop: 5 },
  serviceDescription: { color: muted, fontSize: 11, lineHeight: 15, marginTop: 6, minHeight: 42 },
  checkLink: { color: "#b87039", fontSize: 11, fontWeight: "700", marginTop: 9 },
  darkSection: { backgroundColor: navy, paddingHorizontal: 20, paddingVertical: 40 },
  darkTitle: { color: "white", fontSize: 28, lineHeight: 32, fontWeight: "700", marginBottom: 25 },
  step: { flexDirection: "row", alignItems: "center", gap: 15, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,.14)", paddingVertical: 15 },
  stepNumber: { color: brass, fontSize: 18, fontWeight: "700", width: 32 },
  stepLabel: { color: "white", fontSize: 14, flex: 1 },
  bookingSection: { backgroundColor: cream, paddingHorizontal: 18, paddingVertical: 42, alignItems: "center" },
  formCard: { backgroundColor: "white", borderRadius: 18, padding: 16, marginTop: 22, borderWidth: 1, borderColor: "#e7e1d7", width: "100%", maxWidth: 600 },
  fieldLabel: { color: ink, fontSize: 11, fontWeight: "700", marginTop: 13, marginBottom: 7 },
  input: { borderWidth: 1, borderColor: "#ded8ce", borderRadius: 11, paddingHorizontal: 12, paddingVertical: 11, color: ink, fontSize: 13, backgroundColor: "#fff" },
  detailsInput: { minHeight: 92, textAlignVertical: "top" },
  choiceRow: { flexDirection: "row", gap: 7, paddingHorizontal: 2, flexWrap: "wrap" },
  choice: { borderWidth: 1, borderColor: "#dcd5ca", borderRadius: 18, paddingHorizontal: 11, paddingVertical: 8, marginBottom: 5 },
  choiceActive: { borderColor: brass, backgroundColor: "#f2dfbe" },
  choiceText: { color: muted, fontSize: 10 },
  choiceTextActive: { color: ink, fontWeight: "700" },
  contactSection: { backgroundColor: navy, paddingHorizontal: 20, paddingTop: 40, paddingBottom: 30 },
  contactTitle: { color: "white", fontSize: 19, fontWeight: "700", marginTop: 25 },
  contactAddress: { color: "rgba(255,255,255,.67)", fontSize: 13, lineHeight: 21, marginTop: 10 },
  contactActions: { flexDirection: "row", gap: 10, marginTop: 22, flexWrap: "wrap" },
  footer: { color: "rgba(255,255,255,.4)", fontSize: 10, marginTop: 35 },
  modalBackdrop: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(6,25,38,.64)" },
  modalCard: { backgroundColor: cream, borderRadius: 24, maxHeight: "91%", width: "92%", maxWidth: 540, padding: 18 },
  modalHeader: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  modalTitle: { color: ink, fontSize: 26, lineHeight: 30, fontWeight: "700" },
  closeButton: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: "#d8d1c6", alignItems: "center", justifyContent: "center" },
  closeText: { color: ink, fontSize: 26, lineHeight: 28, fontWeight: "300" },
  disclaimer: { backgroundColor: "#f2eadb", color: "black", fontSize: 11, lineHeight: 17, padding: 12, borderRadius: 11, marginTop: 16 },
  modalList: { paddingTop: 13, paddingBottom: 24 },
  itemRow: { flexDirection: "row", alignItems: "center", gap: 9, backgroundColor: "white", borderRadius: 13, padding: 8, marginBottom: 8, borderWidth: 1, borderColor: "#e4ded4" },
  itemImage: { width: 52, height: 52, borderRadius: 9 },
  itemCopy: { flex: 1 },
  itemName: { color: ink, fontSize: 12, lineHeight: 16, fontWeight: "600" },
  itemDetail: { color: muted, fontSize: 9, lineHeight: 13, marginTop: 3 },
  itemPriceBox: { alignItems: "flex-end", maxWidth: 80 },
  itemPrice: { color: "#b87039", fontSize: 12, fontWeight: "700", textAlign: "right" },
  requestLink: { color: "#b87039", fontSize: 8, textDecorationLine: "underline", marginTop: 5, textAlign: "right" },
  rtlText: { textAlign: "right" }
});