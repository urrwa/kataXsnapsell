import { AnimatedButton } from '../components/AnimatedButton';
import React, { useSyncExternalStore } from 'react';
import english from './en.json';
import german from './de.json';
export type Language = 'de' | 'en';
const listeners = new Set<() => void>();
const readInitial = (): Language => {const query=new URLSearchParams(location.search).get('lang');if(query==='en'||query==='de')return query;try{return localStorage.getItem('academy-language')==='en'?'en':'de';}catch{return 'de';}};
let language:Language=readInitial();
const subscribe=(listener:()=>void)=>{listeners.add(listener);return()=>{listeners.delete(listener);};};
export const getLanguage=()=>language;
export const useLanguage=()=>useSyncExternalStore(subscribe,getLanguage,()=> 'de' as Language);
export function translateText(value:string,locale:Language=language):string{
 const key=value.trim().replace(/\s+/g,' ');const translated=((locale==='de'?german:english) as Record<string,string>)[key];
 if(translated!==undefined)return value.replace(/\S[\s\S]*\S|\S/,()=>translated);
 if(locale==='de')return value;
 return value.replace(/^Sektion (\d+) von 13$/,'Section $1 of 13').replace(/^Chat-Schritt anzeigen (\d+)$/,'Show chat step $1');
}
export function t<T>(value:T):T {if(typeof value==='string')return translateText(value) as T;if(Array.isArray(value))return value.map(item=>t(item)) as T;return value;}
function updateDocument(){document.documentElement.lang=language;document.title=language==='en'?'Katharina Academy | Creator Business with AI and SnapSell':'Katharina Academy | Creator Business mit AI und SnapSell';const description=language==='en'?'Build your creator business with Katharina. Use AI Chat Support, AI Content Creation and SnapSell CRM for content, buyer management and direct sales.':'Baue mit Katharina dein Creator-Business auf. Nutze AI Chat Support, AI Content Creation und SnapSell CRM für Content, Käufermanagement und direkte Verkäufe.';document.querySelector('meta[name="description"]')?.setAttribute('content',description);document.querySelector('meta[property="og:locale"]')?.setAttribute('content',language==='en'?'en_US':'de_DE');document.querySelector('meta[property="og:description"]')?.setAttribute('content',description);document.querySelector('meta[name="twitter:description"]')?.setAttribute('content',description);}
export function setLanguage(next:Language){if(next===language)return;language=next;try{localStorage.setItem('academy-language',next);}catch{}const url=new URL(location.href);url.searchParams.set('lang',next);history.replaceState(null,'',url);updateDocument();listeners.forEach(listener=>listener());}
updateDocument();
export function LanguageSwitcher(){const current=useLanguage();return <div className="language-switch" role="group" aria-label={current==='en'?'Website language':'Sprache der Website'}>{(['de','en'] as const).map(code=><AnimatedButton animationVariant="icon" key={code} type="button" lang={code} aria-label={code==='de'?'Deutsch':'English'} aria-pressed={current===code} onClick={()=>setLanguage(code)}>{code.toUpperCase()}</AnimatedButton>)}</div>;}
