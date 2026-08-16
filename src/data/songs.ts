export type Song = {
  id: number;
  title: string;
  artist: string;
  /** Drop the matching mp3 at this path in /public/music to make it playable. */
  src: string;
};

const raw: Array<[string, string]> = [
  ["Chookar Mere Mann Ko", "Kishore Kumar"],
  ["Mere Samne Wali Khidki Mein", "Kishore Kumar"],
  ["Yeh Dil Na Hota Bechara", "Kishore Kumar"],
  ["Kya Hua Tera Wada", "Mohammed Rafi"],
  ["Tumko Dekha To Yeh Khayal Aaya", "Jagjit Singh & Chitra Singh"],
  ["Hum Bewafa Hargiz Na The", "Kishore Kumar"],
  ["Mehbooba Mehbooba", "R.D. Burman"],
  ["Bhanwre Ki Gunjan", "Kishore Kumar"],
  ["Jab Koi Baat Bigad Jaye", "Kumar Sanu & Sadhana Sargam"],
  ["Jahan Teri Yeh Nazar Hai", "Kishore Kumar"],
  ["Pehla Nasha", "Udit Narayan & Sadhana Sargam"],
  ["Pyar Deewana Hota Hai", "Kishore Kumar"],
  ["Aaj Jaane Ki Zidd Na Karo", "Farida Khanum"],
  ["Chala Jata Hoon", "Kishore Kumar"],
  ["Tere Bina Zindagi Se Koi Shikwa", "Kishore Kumar & Lata Mangeshkar"],
  ["Kuch Na Kaho", "Kumar Sanu & Sadhana Sargam"],
  ["Pal Pal Dil Ke Paas", "Kishore Kumar"],
  ["Roop Tera Mastana", "Kishore Kumar"],
  ["Musafir Hoon Yaaron", "Kishore Kumar"],
  ["Yeh Jawani Hai Deewani", "Kishore Kumar"],
  ["Tere Jaisa Yaar Kahan", "Kishore Kumar"],
  ["Ek Pyar Ka Nagma Hai", "Lata Mangeshkar & Mukesh"],
  ["Gaata Rahe Mera Dil", "Kishore Kumar & Lata Mangeshkar"],
  ["Ajeeb Dastaan Hai Yeh", "Lata Mangeshkar"],
  ["Hothon Se Chhu Lo Tum", "Jagjit Singh"],
  ["Tera Mujhse Hai Pehla Ka Naata Koi", "Kishore Kumar"],
  ["Tujhse Naraz Nahi Zindagi", "Lata Mangeshkar & Anup Ghoshal"],
  ["Yeh Sham Mastani", "Kishore Kumar"],
  ["Hai Apna Dil To Awara", "Hemant Kumar"],
  ["Tum Pukar Lo", "Hemant Kumar"],
  ["Lag Ja Gale", "Lata Mangeshkar"],
  ["Ek Din Aap Yun Humko", "Kumar Sanu & Alka Yagnik"],
  ["Dard-E-Dil Dard-E-Jigar", "Mohammed Rafi"],
  ["Khoya Khoya Chand", "Mohammed Rafi"],
  ["Teri Galiyon Mein Na Rakhenge Kadam", "Mohammed Rafi"],
  ["Chura Liya Hai Tumne Jo Dil Ko", "Asha Bhosle & Mohammed Rafi"],
  ["O Mere Dil Ke Chain", "Kishore Kumar"],
  ["Zindagi Ek Safar Hai Suhana", "Kishore Kumar"],
  ["Aane Wala Pal Jaane Wala Hai", "Kishore Kumar"],
  ["Rimjhim Gire Sawan", "Lata Mangeshkar & Kishore Kumar"],
  ["Tere Bina Zindagi Se", "Lata Mangeshkar & Kishore Kumar"],
  ["Dil Ke Armaan Aansuon Mein", "Salma Agha"],
  ["Humein Aur Jeene Ki", "Kishore Kumar & Asha Bhosle"],
  ["Kabhi Kabhi Mere Dil Mein", "Mukesh & Lata Mangeshkar"],
  ["Tere Mere Sapne", "Mohammed Rafi & Lata Mangeshkar"],
  ["Aap Ki Nazron Ne Samjha", "Lata Mangeshkar"],
  ["Naina Barse Rimjhim Rimjhim", "Lata Mangeshkar"],
  ["Dil Hai Chhota Sa", "Lata Mangeshkar"],
  ["Tujhe Dekha To Yeh Jana Sanam", "Lata Mangeshkar & Kumar Sanu"],
  ["Pehla Pehla Pyar Hai", "S.P. Balasubrahmanyam"],
];

export const songs: Song[] = raw.map(([title, artist], index) => ({
  id: index + 1,
  title,
  artist,
  src: `/music/${String(index + 1).padStart(2, "0")}.mp3`,
}));
