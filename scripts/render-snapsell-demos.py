"""Render deterministic, illustrative product demos. Requires Pillow and ffmpeg."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import subprocess, glob

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/media/snapsell-steps'
OUT.mkdir(parents=True, exist_ok=True)
FF = glob.glob(str(ROOT.parent / '.video-inspection-deps/imageio_ffmpeg/binaries/*.exe'))[0]
W,H,FPS = 960,600,24
MINT='#20c997'
PHOTO=Image.open(ROOT/'public/images/editorial/campaign.webp').convert('RGB')
def font(n): return ImageFont.truetype('C:/Windows/Fonts/arial.ttf', n)
def ease(t):
    t=max(0,min(1,t)); return t*t*(3-2*t)
def mix(a,b,t): return a+(b-a)*t
def txt(d,xy,s,n=24,c='white'): d.text(xy,s,font=font(n),fill=c)
def box(d,xy,fill='#1b2220',r=20,outline=None): d.rounded_rectangle(tuple(int(v) for v in xy),radius=r,fill=fill,outline=outline,width=2)
def photo(im,x,y,w,h):
    p=ImageOps.fit(PHOTO,(int(w),int(h)),centering=(.5,.35))
    mask=Image.new('L',p.size); ImageDraw.Draw(mask).rounded_rectangle((0,0,p.width,p.height),18,fill=255)
    im.paste(p,(int(x),int(y)),mask)
def button(d,x,y,label,w=250):
    box(d,(x,y,x+w,y+54),MINT,15)
    f=font(22); length=d.textlength(label,font=f)
    d.text((x+(w-length)/2,y+14),label,font=f,fill='#06110d')
def cursor(d,x,y,click=False):
    if click: d.ellipse((x-18,y-18,x+18,y+18),outline=MINT,width=3)
    d.polygon([(x,y),(x+5,y+29),(x+12,y+20),(x+24,y+18)],fill='white',outline='#080808')
def frame(step,lang,t):
    im=Image.new('RGB',(W,H),'#0d1210'); d=ImageDraw.Draw(im)
    de=lang=='de'
    txt(d,(40,28),'SNAPSELL',18,MINT)
    txt(d,(660,28),'ILLUSTRATIVE DEMO' if not de else 'ILLUSTRATIVE VORSCHAU',15,'#99aaa2')
    title='Digitales Lookbook' if de else 'Digital lookbook'
    if step==1:
        p=ease((t-.6)/2)
        for i in [0,2,1]:
            x=mix(90+i*275,350,p); y=mix(135+(i%2)*25,100,p)
            photo(im,x,y,mix(230,260,p),mix(290,340,p))
        d=ImageDraw.Draw(im)
        if t>2.8:
            txt(d,(350,462),title,28)
            txt(d,(350,505),'Bereit' if de else 'Ready to use',20,MINT)
        if t<2.8: cursor(d,mix(230,475,p),mix(440,295,p),.6<t<1)
    elif step==2:
        photo(im,90,100,280,390)
        txt(d,(430,140),title,30)
        txt(d,(430,213),'Beispielpreis' if de else 'Example price',19,'#a7b5ad')
        box(d,(430,248,820,325),outline=MINT)
        val=('49,00 €' if de else '€49.00') if t>1.5 else ('49' if t>.9 else '|')
        txt(d,(454,265),val,35)
        button(d,430,368,('Gespeichert' if de else 'Saved') if t>3 else ('Speichern' if de else 'Save'))
        cursor(d,650,397,2.7<t<3.2)
    elif step==3:
        photo(im,70,95,230,320)
        txt(d,(70,438),title,25)
        box(d,(355,110,890,485))
        txt(d,(385,138),'Demo-Chat' if de else 'Demo conversation',20,'#a7b5ad')
        p=ease((t-1.8)/.8)
        y=mix(360,220,p)
        box(d,(385,y,860,y+110),'#174a39' if t>1.8 else '#28312d')
        txt(d,(405,y+20),'example.com/lookbook',24)
        txt(d,(405,y+61),('Gesendet' if de else 'Sent') if t>2.6 else ('Link kopieren' if de else 'Copy link'),18,MINT)
        if t<2: cursor(d,690,400,t>.8)
    elif step==4:
        photo(im,90,100,280,390)
        txt(d,(430,150),title,30)
        txt(d,(430,216),'49,00 € · Demo' if de else '€49.00 · Demo',28,'#a7b5ad')
        button(d,430,310,('Bezahlt' if de else 'Payment received') if t>2.7 else ('Kaufen' if de else 'Purchase'),370)
        if t<2.7: cursor(d,690,338,1.6<t<2.2)
        else:
            txt(d,(430,400),'Zahlung bestätigt' if de else 'Payment confirmed',23,MINT)
    else:
        p=ease((t-2)/1.2)
        x=mix(90,290,p); y=mix(100,72,p)
        photo(im,x,y,mix(280,380,p),mix(390,456,p))
        if t<2.5:
            txt(d,(430,150),title,30)
            txt(d,(430,222),'Dein Inhalt ist bereit.' if de else 'Your content is ready.',24,'#a7b5ad')
            button(d,430,310,'Öffnen' if de else 'Open lookbook',330)
            cursor(d,665,340,1.6<t<2.1)
        if t>3.2:
            d=ImageDraw.Draw(im); box(d,(325,465,635,512),'#0d1210',12)
            txt(d,(347,476),title,24)
    return im
if __name__=='__main__':
    for lang in ['en','de']:
        for step in range(1,6):
            path=OUT/f'{step}-{lang}.mp4'
            proc=subprocess.Popen([FF,'-y','-loglevel','error','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart',str(path)],stdin=subprocess.PIPE)
            for i in range(5*FPS): proc.stdin.write(frame(step,lang,i/FPS).tobytes())
            proc.stdin.close()
            if proc.wait(): raise RuntimeError(path)
            frame(step,lang,4.9).save(OUT/f'{step}-{lang}.jpg',quality=90)
            print(path.name,flush=True)
