"use client";
import {createContext,useContext,useEffect,useState} from "react";

type Lang="bn"|"en";
const dict={
 bn:{home:"হোম",quiz:"কুইজ",learn:"শিখুন",heroBadge:"বিশ্বকে জানা এখন আরও মজার",heroTitle:"বিশ্বকে জানুন।",heroTitle2:"নিজেকে যাচাই করুন।",heroText:"দেশ ঘুরে দেখুন, পতাকা চিনুন, গুরুত্বপূর্ণ তথ্য জানুন—তারপর মজার কুইজে নিজের জ্ঞান যাচাই করুন।",start:"কুইজ শুরু করুন",explore:"দেশগুলো দেখুন",challenge:"আজকের চ্যালেঞ্জ",challengeTitle:"পতাকাটি কোন দেশের?",challengeText:"কোনো ইঙ্গিত নেই। শুধু আপনার জ্ঞান।",play:"এখনই খেলুন",threeWays:"এক অ্যাপ, শেখার তিনটি উপায়",identify:"চারটি অপশনের মাধ্যমে পতাকা চিনুন।",facts:"নিজের গতিতে দেশের তথ্য জানুন।",random:"হঠাৎ একটি দেশ বেছে নিয়ে চ্যালেঞ্জ নিন।",search:"দেশ খুঁজুন",all:"সব",found:"টি দেশ পাওয়া গেছে",noCountries:"কোনো দেশ পাওয়া যায়নি",tryAnother:"অন্য নাম বা অঞ্চল দিয়ে খুঁজে দেখুন।",allCountries:"সব দেশ",test:"নিজেকে যাচাই করুন",capital:"রাজধানী",region:"অঞ্চল",subregion:"উপঅঞ্চল",population:"জনসংখ্যা",currency:"মুদ্রা",languages:"ভাষা",code:"দেশের কোড",notFound:"দেশটি পাওয়া যায়নি",back:"দেশগুলোর তালিকায় ফিরুন",which:"এই পতাকাটি কোন দেশের?",loading:"কুইজ তৈরি হচ্ছে…",loadingText:"দেশ ও পতাকার তথ্য আনা হচ্ছে।",complete:"কুইজ শেষ!",tryAgain:"আবার খেলুন",correct:"সঠিক! 🎉",wrong:"ঠিক হয়নি।",answer:"সঠিক উত্তর হলো",next:"পরের প্রশ্ন",excellent:"দারুণ করেছেন!",good:"ভালো হয়েছে! শেখা চালিয়ে যান।",nice:"চেষ্টা ভালো হয়েছে। শিখুন এবং আবার খেলুন।",flagQuiz:"পতাকা কুইজ",learnIntro:"বিশ্বের দেশগুলো ঘুরে দেখুন, পতাকা, রাজধানী ও গুরুত্বপূর্ণ তথ্য জানুন।",english:"English",bangla:"বাংলা"},
 en:{home:"Home",quiz:"Quiz",learn:"Learn",heroBadge:"World geography made fun",heroTitle:"Learn the world.",heroTitle2:"Test yourself.",heroText:"Explore countries, discover their flags and facts, then challenge yourself with fast interactive quizzes.",start:"Start Quiz",explore:"Explore Countries",challenge:"TODAY'S CHALLENGE",challengeTitle:"Can you name the flag?",challengeText:"No clues. Just your knowledge.",play:"Play now",threeWays:"One app, three ways to learn",identify:"Identify flags with four-choice questions.",facts:"Explore country facts at your own pace.",random:"Jump into a surprise country challenge.",search:"Search countries",all:"All",found:"countries found",noCountries:"No countries found",tryAnother:"Try another search or region.",allCountries:"All countries",test:"Test Yourself",capital:"Capital",region:"Region",subregion:"Subregion",population:"Population",currency:"Currency",languages:"Languages",code:"Country code",notFound:"Country not found",back:"Back to countries",which:"Which country is this?",loading:"Preparing your quiz…",loadingText:"Loading countries and flags.",complete:"Quiz complete!",tryAgain:"Try Again",correct:"Correct! 🎉",wrong:"Not quite.",answer:"The correct answer is",next:"Next Question",excellent:"Excellent work!",good:"Good job! Keep learning.",nice:"Nice try. Explore Learn and play again.",flagQuiz:"FLAG QUIZ",learnIntro:"Browse countries around the world, discover their flags, capitals and key facts.",english:"English",bangla:"বাংলা"}
} as const;

type T=Record<keyof typeof dict.en,string>;
type ContextValue={lang:Lang;setLang:(l:Lang)=>void;t:T};
const Ctx=createContext<ContextValue>({lang:"bn",setLang:()=>{},t:dict.bn});

export function LanguageProvider({children}:{children:React.ReactNode}){
  const [lang,setLangState]=useState<Lang>("bn");
  useEffect(()=>{const saved=localStorage.getItem("flagquest-lang") as Lang|null;if(saved==="bn"||saved==="en") setLangState(saved)},[]);
  function setLang(l:Lang){setLangState(l);localStorage.setItem("flagquest-lang",l)}
  return <Ctx.Provider value={{lang,setLang,t:dict[lang] as T}}>{children}</Ctx.Provider>
}
export function useLanguage(){return useContext(Ctx)}
