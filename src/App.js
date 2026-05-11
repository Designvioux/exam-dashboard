import { useState, useMemo } from "react";

/* ─── GLOBAL CSS ─────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --p:#2563EB;--pl:#EFF6FF;--pm:#DBEAFE;--pd:#1D4ED8;
  --g:#10B981;--gl:#ECFDF5;--w:#F59E0B;--wl:#FFFBEB;
  --r:#EF4444;--rl:#FEF2F2;
  --t1:#0F172A;--t2:#64748B;--t3:#94A3B8;
  --bd:#E2E8F0;--bg:#F8FAFC;--wh:#FFFFFF;
  --sw:248px;--sh:64px;
  --rad:10px;--rad2:6px;
  --s1:0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04);
  --s2:0 4px 12px rgba(0,0,0,.06),0 2px 4px rgba(0,0,0,.04);
  --s3:0 8px 24px rgba(0,0,0,.08),0 2px 8px rgba(0,0,0,.04);
}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--t1)}
.layout{display:flex;height:100vh;overflow:hidden}

/* SIDEBAR */
.sb{width:var(--sw);min-width:var(--sw);background:var(--wh);border-right:1px solid var(--bd);display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden;z-index:50}
.sb::-webkit-scrollbar{width:4px}.sb::-webkit-scrollbar-thumb{background:var(--bd);border-radius:4px}
.sb-brand{display:flex;align-items:center;gap:10px;padding:20px 20px 16px;border-bottom:1px solid var(--bd)}
.brand-ic{width:36px;height:36px;background:var(--p);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.brand-nm{font-size:14px;font-weight:700;color:var(--t1);line-height:1.2}
.brand-sb{font-size:11px;color:var(--t3);font-weight:400}
.sb-sec{padding:16px 12px 8px}
.sb-lbl{font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.08em;text-transform:uppercase;padding:0 8px 8px}
.nv{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--rad2);cursor:pointer;transition:all .15s;font-size:13.5px;font-weight:500;color:var(--t2);margin-bottom:2px}
.nv:hover{background:var(--bg);color:var(--t1)}
.nv.active{background:var(--pl);color:var(--p);font-weight:600}
.nv.active .nv-ic{opacity:1}
.nv-ic{width:18px;height:18px;flex-shrink:0;opacity:.7}
.nv-badge{margin-left:auto;background:var(--r);color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:20px;min-width:18px;text-align:center}
.nv-badge.blue{background:var(--p)}
.sb-foot{margin-top:auto;padding:12px;border-top:1px solid var(--bd)}
.u-card{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:var(--rad2);cursor:pointer;transition:background .15s}
.u-card:hover{background:var(--bg)}
.av{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#2563EB,#7C3AED);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0}
.u-nm{font-size:13px;font-weight:600;color:var(--t1)}
.u-rl{font-size:11px;color:var(--t3)}

/* MAIN */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}

/* HEADER */
.hdr{height:var(--sh);min-height:var(--sh);background:var(--wh);border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:16px;padding:0 24px;position:sticky;top:0;z-index:40}
.hdr-ttl{font-size:16px;font-weight:700;color:var(--t1);flex:0 0 auto}
.hdr-srch{flex:1;max-width:340px;margin-left:auto;display:flex;align-items:center;gap:8px;background:var(--bg);border:1px solid var(--bd);border-radius:8px;padding:8px 14px}
.hdr-srch input{background:none;border:none;outline:none;font-family:inherit;font-size:13px;color:var(--t1);width:100%}
.hdr-srch input::placeholder{color:var(--t3)}
.hdr-acts{display:flex;align-items:center;gap:8px;margin-left:12px}
.ic-btn{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;border:1px solid var(--bd);background:var(--wh);cursor:pointer;color:var(--t2);transition:all .15s;position:relative}
.ic-btn:hover{background:var(--bg);color:var(--t1)}
.n-dot{position:absolute;top:7px;right:7px;width:7px;height:7px;background:var(--r);border-radius:50%;border:1.5px solid #fff}
.hdr-av{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#2563EB,#7C3AED);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;cursor:pointer;flex-shrink:0}

/* CONTENT */
.cnt{flex:1;overflow-y:auto;padding:24px}
.cnt::-webkit-scrollbar{width:6px}.cnt::-webkit-scrollbar-thumb{background:var(--bd);border-radius:4px}

/* CARDS */
.card{background:var(--wh);border-radius:var(--rad);border:1px solid var(--bd);box-shadow:var(--s1)}
.cp{padding:20px}

/* STAT CARDS */
.sg{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:20px}
.sc{background:var(--wh);border-radius:var(--rad);border:1px solid var(--bd);padding:20px;box-shadow:var(--s1);transition:box-shadow .2s,transform .2s;cursor:default}
.sc:hover{box-shadow:var(--s3);transform:translateY(-1px)}
.sc-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px}
.sc-ic{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center}
.sc-ch{font-size:11.5px;font-weight:600;padding:3px 8px;border-radius:20px}
.sc-ch.up{background:var(--gl);color:var(--g)}
.sc-ch.dn{background:var(--rl);color:var(--r)}
.sc-val{font-size:28px;font-weight:800;color:var(--t1);letter-spacing:-.5px}
.sc-lbl{font-size:13px;color:var(--t2);margin-top:3px;font-weight:500}

/* CHART GRID */
.cg2{display:grid;grid-template-columns:1.6fr 1fr;gap:16px;margin-bottom:20px}

/* PAGE HEADER */
.ph{margin-bottom:20px}
.ph-ttl{font-size:20px;font-weight:800;color:var(--t1);letter-spacing:-.3px}
.ph-sub{font-size:13px;color:var(--t3);margin-top:3px}

/* TOOLBAR */
.tb{display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap}
.srch-box{display:flex;align-items:center;gap:8px;background:var(--wh);border:1.5px solid var(--bd);border-radius:8px;padding:8px 14px;min-width:220px;transition:border-color .15s}
.srch-box:focus-within{border-color:var(--p);box-shadow:0 0 0 3px rgba(37,99,235,.08)}
.srch-box input{background:none;border:none;outline:none;font-family:inherit;font-size:13px;color:var(--t1);width:100%}
.srch-box input::placeholder{color:var(--t3)}
.sel{padding:8px 12px;border-radius:var(--rad2);border:1.5px solid var(--bd);background:var(--wh);font-family:inherit;font-size:13px;color:var(--t1);outline:none;cursor:pointer;transition:border-color .15s}
.sel:focus{border-color:var(--p)}

/* FILTER PILLS */
.pill-row{display:flex;gap:6px;flex-wrap:wrap}
.pill{padding:6px 14px;border-radius:20px;font-size:12.5px;font-weight:600;cursor:pointer;border:1.5px solid var(--bd);background:var(--wh);color:var(--t2);transition:all .15s;font-family:inherit}
.pill:hover{border-color:var(--p);color:var(--p)}
.pill.active{background:var(--p);color:#fff;border-color:var(--p)}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:var(--rad2);font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;border:none;white-space:nowrap}
.btn-p{background:var(--p);color:#fff}.btn-p:hover{background:var(--pd);box-shadow:0 4px 12px rgba(37,99,235,.35)}
.btn-o{background:transparent;color:var(--p);border:1.5px solid var(--p)}.btn-o:hover{background:var(--pl)}
.btn-g{background:var(--bg);color:var(--t2);border:1px solid var(--bd)}.btn-g:hover{background:var(--bd);color:var(--t1)}
.btn-sm{padding:6px 12px;font-size:12px}
.btn-dn{background:var(--rl);color:var(--r)}

/* TABLE */
.tw{overflow-x:auto}
table{width:100%;border-collapse:collapse}
thead th{font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.06em;padding:10px 16px;text-align:left;background:var(--bg);border-bottom:1px solid var(--bd)}
tbody tr{transition:background .12s;border-bottom:1px solid var(--bd)}
tbody tr:last-child{border-bottom:none}
tbody tr:hover{background:#F8FAFC}
tbody td{padding:13px 16px;font-size:13.5px;color:var(--t1);vertical-align:middle}
.td2{color:var(--t2);font-size:13px}
.tdb{font-weight:600}
.row-acts{display:flex;gap:6px;opacity:0;transition:opacity .15s}
tbody tr:hover .row-acts{opacity:1}

/* BADGES */
.bdg{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;font-size:11.5px;font-weight:600}
.bdg-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.bdg-g{background:var(--gl);color:var(--g)}.bdg-g .bdg-dot{background:var(--g)}
.bdg-r{background:var(--rl);color:var(--r)}.bdg-r .bdg-dot{background:var(--r)}
.bdg-y{background:var(--wl);color:var(--w)}.bdg-y .bdg-dot{background:var(--w)}
.bdg-b{background:var(--pl);color:var(--p)}.bdg-b .bdg-dot{background:var(--p)}

/* SCHOOL AVATAR */
.sav{width:32px;height:32px;border-radius:8px;background:var(--pm);color:var(--p);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700}

/* PROGRESS */
.pw{background:var(--bd);border-radius:20px;height:6px;overflow:hidden}
.pf{height:100%;border-radius:20px;transition:width .4s ease}
.pb{background:var(--p)}.pg{background:var(--g)}.py{background:var(--w)}.pr{background:var(--r)}

/* BAR CHART */
.bchart{display:flex;align-items:flex-end;gap:6px;height:140px;padding:0 0 4px}
.bgrp{flex:1;display:flex;align-items:flex-end;gap:2px}
.bar{border-radius:4px 4px 0 0;flex:1;transition:opacity .2s;cursor:pointer;min-width:8px;position:relative}
.bar:hover{opacity:.75}
.bar-tip{position:absolute;bottom:calc(100% + 4px);left:50%;transform:translateX(-50%);background:var(--t1);color:#fff;font-size:10px;font-weight:600;padding:3px 7px;border-radius:4px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s}
.bar:hover .bar-tip{opacity:1}
.blbls{display:flex;gap:6px;margin-top:8px}
.blbl{flex:1;text-align:center;font-size:10px;color:var(--t3);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* DONUT */
.donut{width:120px;height:120px;border-radius:50%;background:conic-gradient(var(--g) 0% 42%,var(--p) 42% 72%,var(--w) 72% 88%,var(--r) 88% 100%);display:flex;align-items:center;justify-content:center}
.dhole{width:72px;height:72px;background:#fff;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center}
.dv{font-size:18px;font-weight:800;color:var(--t1)}
.ds{font-size:9px;color:var(--t3);font-weight:500}
.lgnd{display:flex;flex-direction:column;gap:10px}
.li{display:flex;align-items:center;gap:8px}
.ld{width:10px;height:10px;border-radius:3px;flex-shrink:0}
.lt{font-size:12.5px;color:var(--t2);flex:1}
.lv{font-size:12.5px;font-weight:700;color:var(--t1)}

/* SEC HEADER */
.sh2{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.sh2-t{font-size:14px;font-weight:700;color:var(--t1)}
.sh2-s{font-size:12px;color:var(--t3);margin-top:1px}

/* FORM */
.fg{display:flex;flex-direction:column;gap:6px}
.fl{font-size:12px;font-weight:600;color:var(--t2)}
.fi{padding:9px 12px;border-radius:var(--rad2);border:1.5px solid var(--bd);background:var(--wh);font-family:inherit;font-size:13.5px;color:var(--t1);outline:none;transition:border-color .15s}
.fi:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(37,99,235,.08)}
.fi::placeholder{color:var(--t3)}
.ta{width:100%;padding:10px 12px;border-radius:var(--rad2);border:1.5px solid var(--bd);font-family:inherit;font-size:13.5px;color:var(--t1);resize:vertical;min-height:90px;outline:none;transition:border-color .15s;background:#fff}
.ta:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(37,99,235,.08)}

/* DRAWER */
.dov{position:fixed;inset:0;background:rgba(15,23,42,.4);z-index:100;display:flex;justify-content:flex-end;animation:fi .2s ease}
.drw{width:420px;height:100%;background:#fff;box-shadow:var(--s3);overflow-y:auto;animation:si .25s ease}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes si{from{transform:translateX(100%)}to{transform:translateX(0)}}
.drw::-webkit-scrollbar{width:4px}.drw::-webkit-scrollbar-thumb{background:var(--bd);border-radius:4px}
.dhdr{display:flex;align-items:center;justify-content:space-between;padding:20px;border-bottom:1px solid var(--bd);position:sticky;top:0;background:#fff;z-index:1}
.dbd{padding:20px}
.dc{width:32px;height:32px;border-radius:6px;border:1px solid var(--bd);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--t2);font-size:16px;transition:all .15s}
.dc:hover{background:var(--rl);color:var(--r);border-color:var(--r)}
.ir{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--bd)}
.ir:last-child{border-bottom:none}
.ik{font-size:12.5px;color:var(--t3);font-weight:500}
.iv{font-size:13px;font-weight:600;color:var(--t1);text-align:right}

/* ACTIVITY */
.act-list{display:flex;flex-direction:column}
.act-item{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid var(--bd)}
.act-item:last-child{border-bottom:none}
.act-ic{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px}
.act-tx{font-size:13px;color:var(--t1);font-weight:500;line-height:1.4}
.act-tm{font-size:11.5px;color:var(--t3);margin-top:2px}

/* TABS */
.tabs{display:flex;gap:4px;background:var(--bg);padding:4px;border-radius:8px;width:fit-content;margin-bottom:20px}
.tab{padding:7px 16px;border-radius:var(--rad2);font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;color:var(--t2);font-family:inherit;border:none;background:none}
.tab.active{background:#fff;color:var(--p);font-weight:600;box-shadow:var(--s1)}
.tab:hover:not(.active){color:var(--t1)}

/* STATS MINI ROW */
.mini-stats{display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap}
.mini-s{flex:1;min-width:140px;background:var(--wh);border-radius:var(--rad);border:1px solid var(--bd);padding:14px 18px;box-shadow:var(--s1)}
.mini-v{font-size:22px;font-weight:800}
.mini-l{font-size:12px;color:var(--t3);margin-top:2px}

/* SEND BTNS */
.send-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}

/* NOTIF ITEM */
.ni{padding:14px 0;border-bottom:1px solid var(--bd)}
.ni:last-child{border-bottom:none}

/* 2 COL */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.gff{grid-column:1/-1}

/* CHIP */
.chip-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
.chip{font-size:11px;font-weight:600;padding:3px 8px;border-radius:4px;background:var(--pl);color:var(--p)}

/* STUDENT MODAL */
.modal-ov{position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:200;display:flex;align-items:center;justify-content:center;animation:fi .2s ease}
.modal{background:#fff;border-radius:var(--rad);width:700px;max-width:95vw;max-height:85vh;display:flex;flex-direction:column;box-shadow:var(--s3);animation:mu .25s ease}
@keyframes mu{from{transform:scale(.96) translateY(10px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
.modal-hdr{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--bd);flex-shrink:0}
.modal-body{overflow-y:auto;flex:1;padding:20px 24px}
.modal-body::-webkit-scrollbar{width:4px}.modal-body::-webkit-scrollbar-thumb{background:var(--bd);border-radius:4px}

/* WARN ROW */
.warn-row td{background:var(--rl)!important}
.low-row td{background:var(--wl)!important}

/* EMPTY STATE */
.empty{text-align:center;padding:48px 24px}
.empty-ic{font-size:36px;margin-bottom:12px}
.empty-t{font-size:15px;font-weight:700;color:var(--t1);margin-bottom:6px}
.empty-s{font-size:13px;color:var(--t3)}

/* TOGGLE */
.tog{width:40px;height:22px;border-radius:20px;position:relative;cursor:pointer;transition:background .2s;flex-shrink:0}
.tog-k{width:16px;height:16px;border-radius:50%;background:#fff;position:absolute;top:3px;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,.2)}
`;

/* ─── ICONS ────────────────────────────────────────────────────── */
const IC = ({ n, s = 18, c = "currentColor" }) => {
  const d = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    school: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    teacher: <><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0113 0"/><line x1="18" y1="9" x2="22" y2="9"/><line x1="22" y1="7" x2="22" y2="11"/></>,
    student: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    exam: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>,
    fees: <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
    center: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    notif: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    report: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    upload: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    sms: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    trend: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    chevR: <><polyline points="9 18 15 12 9 6"/></>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d[n]}</svg>;
};

const Bdg = ({ type, label }) => {
  const cls = { green:"bdg-g", red:"bdg-r", yellow:"bdg-y", blue:"bdg-b" }[type]||"bdg-b";
  return <span className={`bdg ${cls}`}><span className="bdg-dot"/>{label}</span>;
};

/* ─── DATA ─────────────────────────────────────────────────────── */
const EXAMS = ["All", "Manthan", "Shabbas", "ICS"];

const SCHOOLS_DATA = [
  { id:1, name:"Ryan International School", code:"RI", location:"Mumbai", district:"Thane", teachers:34, status:"active", exams:["Manthan","ICS"] },
  { id:2, name:"Podar International", code:"PI", location:"Pune", district:"Pune", teachers:28, status:"active", exams:["Shabbas","Manthan"] },
  { id:3, name:"Delhi Public School", code:"DP", location:"Delhi", district:"South Delhi", teachers:26, status:"active", exams:["ICS"] },
  { id:4, name:"St. Mary's Convent", code:"SM", location:"Nagpur", district:"Nagpur", teachers:22, status:"active", exams:["Manthan","Shabbas"] },
  { id:5, name:"Kendriya Vidyalaya", code:"KV", location:"Nashik", district:"Nashik", teachers:20, status:"active", exams:["Shabbas"] },
  { id:6, name:"Vidya Valley School", code:"VV", location:"Pune", district:"Pimpri", teachers:18, status:"inactive", exams:["ICS","Manthan"] },
  { id:7, name:"Billabong High", code:"BH", location:"Mumbai", district:"Andheri", teachers:16, status:"active", exams:["Manthan"] },
];

const STUDENTS_DATA = [
  { id:1, name:"Aarav Shah", class:"9", div:"A", schoolId:1, roll:"RI-901", status:"active" },
  { id:2, name:"Diya Mehta", class:"8", div:"B", schoolId:2, roll:"PI-802", status:"active" },
  { id:3, name:"Rohan Kulkarni", class:"10", div:"A", schoolId:3, roll:"DP-1001", status:"active" },
  { id:4, name:"Ananya Iyer", class:"7", div:"C", schoolId:1, roll:"RI-703", status:"active" },
  { id:5, name:"Kabir Singh", class:"9", div:"B", schoolId:5, roll:"KV-902", status:"inactive" },
  { id:6, name:"Ishaan Verma", class:"10", div:"A", schoolId:1, roll:"RI-1003", status:"active" },
  { id:7, name:"Saanvi Reddy", class:"8", div:"A", schoolId:7, roll:"BH-801", status:"active" },
  { id:8, name:"Arjun Nair", class:"9", div:"C", schoolId:6, roll:"VV-903", status:"active" },
  { id:9, name:"Meera Sharma", class:"7", div:"A", schoolId:2, roll:"PI-701", status:"active" },
  { id:10, name:"Laksh Patel", class:"10", div:"B", schoolId:4, roll:"SM-1002", status:"active" },
  { id:11, name:"Riya Desai", class:"8", div:"A", schoolId:1, roll:"RI-803", status:"active" },
  { id:12, name:"Dev Gupta", class:"9", div:"B", schoolId:3, roll:"DP-902", status:"active" },
  { id:13, name:"Tanvi Joshi", class:"7", div:"C", schoolId:4, roll:"SM-703", status:"inactive" },
  { id:14, name:"Pratik Nair", class:"10", div:"A", schoolId:5, roll:"KV-1001", status:"active" },
  { id:15, name:"Aditi Rao", class:"8", div:"B", schoolId:6, roll:"VV-802", status:"active" },
];
// Assign student counts to schools
const SCHOOL_STUDENT_COUNT = {};
STUDENTS_DATA.forEach(s => { SCHOOL_STUDENT_COUNT[s.schoolId] = (SCHOOL_STUDENT_COUNT[s.schoolId]||0)+1; });
const SCHOOLS = SCHOOLS_DATA.map(s => ({ ...s, students: SCHOOL_STUDENT_COUNT[s.id]||0 }));

const TEACHERS_DATA = [
  { id:1, name:"Priya Sharma", initials:"PS", mobile:"+91 98765 43210", subject:"Math", exams:5, examNames:["Manthan","ICS"], school:"Ryan International", schoolId:1, status:"active", email:"priya.s@school.edu", studentCount:92, booksPurchased:50 },
  { id:2, name:"Rahul Desai", initials:"RD", mobile:"+91 97654 32109", subject:"Science", exams:3, examNames:["Shabbas"], school:"Podar International", schoolId:2, status:"active", email:"rahul.d@school.edu", studentCount:64, booksPurchased:45 },
  { id:3, name:"Sunita Patil", initials:"SP", mobile:"+91 96543 21098", subject:"English", exams:4, examNames:["Manthan","Shabbas"], school:"Delhi Public School", schoolId:3, status:"active", email:"sunita.p@school.edu", studentCount:78, booksPurchased:60 },
  { id:4, name:"Arun Kumar", initials:"AK", mobile:"+91 95432 10987", subject:"History", exams:2, examNames:["ICS"], school:"St. Mary's Convent", schoolId:4, status:"inactive", email:"arun.k@school.edu", studentCount:44, booksPurchased:40 },
  { id:5, name:"Meena Joshi", initials:"MJ", mobile:"+91 94321 09876", subject:"Math", exams:6, examNames:["Shabbas","Manthan","ICS"], school:"Kendriya Vidyalaya", schoolId:5, status:"active", email:"meena.j@school.edu", studentCount:112, booksPurchased:55 },
  { id:6, name:"Vijay Nair", initials:"VN", mobile:"+91 93210 98765", subject:"Physics", exams:3, examNames:["Manthan"], school:"Billabong High", schoolId:6, status:"active", email:"vijay.n@school.edu", studentCount:56, booksPurchased:35 },
  { id:7, name:"Kavita Rao", initials:"KR", mobile:"+91 92109 87654", subject:"Biology", exams:4, examNames:["ICS","Shabbas"], school:"Vidya Valley", schoolId:7, status:"active", email:"kavita.r@school.edu", studentCount:68, booksPurchased:48 },
];

const BOOKS_DATA = TEACHERS_DATA.map(t => ({
  teacher: t.name, school: t.school, schoolId: t.schoolId,
  purchased: t.booksPurchased, students: t.studentCount,
  status: t.booksPurchased < 40 ? "critical" : t.booksPurchased < 48 ? "low" : "ok",
}));

const FEES_DATA = [
  { teacher:"Priya Sharma", school:"Ryan International", total:12000, paid:12000, pending:0, status:"paid" },
  { teacher:"Rahul Desai", school:"Podar International", total:10000, paid:7500, pending:2500, status:"partial" },
  { teacher:"Sunita Patil", school:"Delhi Public School", total:11000, paid:0, pending:11000, status:"pending" },
  { teacher:"Arun Kumar", school:"St. Mary's Convent", total:9500, paid:9500, pending:0, status:"paid" },
  { teacher:"Meena Joshi", school:"Kendriya Vidyalaya", total:13000, paid:8000, pending:5000, status:"partial" },
  { teacher:"Vijay Nair", school:"Billabong High", total:10500, paid:10500, pending:0, status:"paid" },
  { teacher:"Kavita Rao", school:"Vidya Valley", total:9000, paid:0, pending:9000, status:"pending" },
];

const CENTERS_DATA = [
  { name:"Mumbai Central Hall", city:"Mumbai", capacity:500, assigned:498 },
  { name:"Pune Exam Center A", city:"Pune", capacity:400, assigned:320 },
  { name:"Nagpur Convention Hall", city:"Nagpur", capacity:350, assigned:290 },
  { name:"Delhi North Center", city:"Delhi", capacity:600, assigned:598 },
  { name:"Nashik Exam Block", city:"Nashik", capacity:250, assigned:180 },
  { name:"Thane Study Center", city:"Thane", capacity:300, assigned:300 },
];

const EXAMS_DATA = [
  { name:"State Level Olympiad 2025", type:"Olympiad", date:"15 Jun 2025", teacher:"Priya Sharma", students:480, status:"upcoming", exam:"ICS" },
  { name:"Science Aptitude Test", type:"Aptitude", date:"10 Jun 2025", teacher:"Rahul Desai", students:320, status:"active", exam:"Shabbas" },
  { name:"Mathematics Olympiad Q1", type:"Olympiad", date:"28 May 2025", teacher:"Meena Joshi", students:560, status:"active", exam:"Manthan" },
  { name:"English Proficiency Test", type:"Proficiency", date:"20 May 2025", teacher:"Sunita Patil", students:280, status:"completed", exam:"Manthan" },
  { name:"Annual Scholarship Exam", type:"Scholarship", date:"01 May 2025", teacher:"Vijay Nair", students:640, status:"completed", exam:"Shabbas" },
  { name:"ICS Regional Finals", type:"Olympiad", date:"12 Apr 2025", teacher:"Kavita Rao", students:390, status:"completed", exam:"ICS" },
];

const NAV = [
  { id:"dashboard", icon:"dashboard", label:"Dashboard" },
  { id:"schools", icon:"school", label:"Schools", badge:"12" },
  { id:"teachers", icon:"teacher", label:"Teachers" },
  { id:"students", icon:"student", label:"Students", badge:"15", blue:true },
  { id:"exams", icon:"exam", label:"Exams" },
  { id:"books", icon:"book", label:"Books" },
  { id:"fees", icon:"fees", label:"Fees" },
  { id:"centers", icon:"center", label:"Centers" },
  { id:"notifications", icon:"notif", label:"Notifications", badge:"3" },
  { id:"reports", icon:"report", label:"Reports" },
  { id:"settings", icon:"settings", label:"Settings" },
];
const PAGE_TITLES = { dashboard:"Dashboard", schools:"Schools Management", teachers:"Teachers Management", students:"Students Management", exams:"Exams Management", books:"Books Tracking", fees:"Fees Management", centers:"Centers Management", notifications:"Notifications", reports:"Reports & Analytics", settings:"Settings" };

/* ─── SEARCH BAR COMPONENT ──────────────────────────────────────── */
const SearchBar = ({ value, onChange, placeholder = "Search…" }) => (
  <div className="srch-box">
    <IC n="search" s={15} c="#94A3B8" />
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    {value && <span style={{ cursor:"pointer", color:"#94A3B8", fontSize:12 }} onClick={() => onChange("")}>✕</span>}
  </div>
);

/* ─── APP ───────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [drawerData, setDrawerData] = useState(null);
  const [schoolModal, setSchoolModal] = useState(null);

  return (
    <>
      <style>{css}</style>
      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sb">
          <div className="sb-brand">
            <div className="brand-ic"><IC n="exam" s={18} c="#fff"/></div>
            <div><div className="brand-nm">ExamPro</div><div className="brand-sb">Super Admin Panel</div></div>
          </div>
          <div className="sb-sec">
            <div className="sb-lbl">Main Menu</div>
            {NAV.slice(0,5).map(n => (
              <div key={n.id} className={`nv ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}>
                <span className="nv-ic"><IC n={n.icon} s={17}/></span>{n.label}
                {n.badge && <span className={`nv-badge ${n.blue?"blue":""}`}>{n.badge}</span>}
              </div>
            ))}
          </div>
          <div className="sb-sec">
            <div className="sb-lbl">Management</div>
            {NAV.slice(5,9).map(n => (
              <div key={n.id} className={`nv ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}>
                <span className="nv-ic"><IC n={n.icon} s={17}/></span>{n.label}
                {n.badge && <span className={`nv-badge ${n.blue?"blue":""}`}>{n.badge}</span>}
              </div>
            ))}
          </div>
          <div className="sb-sec">
            <div className="sb-lbl">Analytics</div>
            {NAV.slice(9).map(n => (
              <div key={n.id} className={`nv ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}>
                <span className="nv-ic"><IC n={n.icon} s={17}/></span>{n.label}
              </div>
            ))}
          </div>
          <div className="sb-foot">
            <div className="u-card">
              <div className="av">SA</div>
              <div><div className="u-nm">Super Admin</div><div className="u-rl">admin@exampro.in</div></div>
            </div>
          </div>
        </aside>

        <div className="main">
          {/* HEADER */}
          <header className="hdr">
            <div className="hdr-ttl">{PAGE_TITLES[page]}</div>
            <div className="hdr-srch">
              <IC n="search" s={15} c="#94A3B8"/>
              <input placeholder="Search students, schools, exams…"/>
            </div>
            <div className="hdr-acts">
              <div className="ic-btn"><IC n="notif" s={16}/><div className="n-dot"/></div>
              <div className="ic-btn"><IC n="settings" s={16}/></div>
              <div className="hdr-av">SA</div>
            </div>
          </header>

          <div className="cnt">
            {page==="dashboard"   && <DashboardPage onNav={setPage}/>}
            {page==="schools"     && <SchoolsPage onSchoolClick={setSchoolModal}/>}
            {page==="teachers"    && <TeachersPage onDrawer={setDrawerData}/>}
            {page==="students"    && <StudentsPage/>}
            {page==="exams"       && <ExamsPage/>}
            {page==="books"       && <BooksPage/>}
            {page==="fees"        && <FeesPage/>}
            {page==="centers"     && <CentersPage/>}
            {page==="notifications" && <NotificationsPage/>}
            {page==="reports"     && <ReportsPage/>}
            {page==="settings"    && <SettingsPage/>}
          </div>
        </div>

        {/* TEACHER DRAWER */}
        {drawerData && (
          <div className="dov" onClick={() => setDrawerData(null)}>
            <div className="drw" onClick={e=>e.stopPropagation()}>
              <div className="dhdr">
                <div><div style={{fontWeight:700,fontSize:15}}>{drawerData.name}</div><div style={{fontSize:12,color:"var(--t3)"}}>Teacher Profile</div></div>
                <button className="dc" onClick={()=>setDrawerData(null)}><IC n="x" s={14}/></button>
              </div>
              <div className="dbd">
                <div style={{textAlign:"center",padding:"20px 0 24px"}}>
                  <div className="av" style={{width:64,height:64,margin:"0 auto 12px",fontSize:22}}>{drawerData.initials}</div>
                  <div style={{fontWeight:700,fontSize:16}}>{drawerData.name}</div>
                  <div style={{color:"var(--t3)",fontSize:13,marginTop:4}}>{drawerData.subject} Teacher</div>
                  <div style={{display:"flex",gap:6,justifyContent:"center",marginTop:10,flexWrap:"wrap"}}>
                    {drawerData.examNames.map(e=><span key={e} className="chip">{e}</span>)}
                  </div>
                </div>
                {/* Stats row */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
                  {[
                    {label:"Students Admitted", val: drawerData.studentCount, icon:"student", color:"#2563EB", bg:"#EFF6FF"},
                    {label:"Books Purchased", val: drawerData.booksPurchased, icon:"book", color:"#10B981", bg:"#ECFDF5"},
                    {label:"Exams Handled", val: drawerData.exams, icon:"exam", color:"#F97316", bg:"#FFF7ED"},
                  ].map(s=>(
                    <div key={s.label} style={{background:s.bg,borderRadius:8,padding:"12px 10px",textAlign:"center"}}>
                      <IC n={s.icon} s={18} c={s.color}/>
                      <div style={{fontSize:20,fontWeight:800,color:s.color,marginTop:6}}>{s.val}</div>
                      <div style={{fontSize:10.5,color:"var(--t3)",marginTop:2,fontWeight:500}}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{borderTop:"1px solid var(--bd)"}}>
                  {[["Mobile",drawerData.mobile],["Email",drawerData.email],["School",drawerData.school],["Subject",drawerData.subject],["Status",<Bdg type={drawerData.status==="active"?"green":"yellow"} label={drawerData.status==="active"?"Active":"Inactive"}/>]].map(([k,v])=>(
                    <div className="ir" key={k}><span className="ik">{k}</span><span className="iv">{v}</span></div>
                  ))}
                </div>
                <div style={{marginTop:20,display:"flex",gap:10}}>
                  <button className="btn btn-p" style={{flex:1}}>Edit Profile</button>
                  <button className="btn btn-g" style={{flex:1}}>Send Message</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCHOOL STUDENTS MODAL */}
        {schoolModal && (
          <div className="modal-ov" onClick={()=>setSchoolModal(null)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-hdr">
                <div>
                  <div style={{fontWeight:700,fontSize:16}}>{schoolModal.name}</div>
                  <div style={{fontSize:12,color:"var(--t3)",marginTop:2}}>Enrolled Students · {STUDENTS_DATA.filter(s=>s.schoolId===schoolModal.id).length} total</div>
                </div>
                <button className="dc" onClick={()=>setSchoolModal(null)}><IC n="x" s={14}/></button>
              </div>
              <div className="modal-body">
                <SchoolStudentsTable school={schoolModal}/>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ─── SCHOOL STUDENTS TABLE ─────────────────────────────────────── */
function SchoolStudentsTable({ school }) {
  const [q, setQ] = useState("");
  const students = STUDENTS_DATA.filter(s => s.schoolId === school.id);
  const filtered = students.filter(s =>
    [s.name, s.roll, s.class, s.div].join(" ").toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div>
      <div className="tb" style={{marginBottom:14}}>
        <SearchBar value={q} onChange={setQ} placeholder="Search students…"/>
        <select className="sel">
          <option>All Classes</option>
          {[...new Set(students.map(s=>s.class))].sort().map(c=><option key={c}>Class {c}</option>)}
        </select>
      </div>
      {filtered.length === 0 ? (
        <div className="empty"><div className="empty-ic">🎓</div><div className="empty-t">No students found</div><div className="empty-s">Try a different search</div></div>
      ) : (
        <table>
          <thead><tr><th>Student Name</th><th>Roll No.</th><th>Class</th><th>Division</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map((s,i)=>(
              <tr key={s.id}>
                <td>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div className="av" style={{width:28,height:28,fontSize:10,background:`hsl(${i*55+190},60%,55%)`}}>{s.name[0]}</div>
                    <span className="tdb">{s.name}</span>
                  </div>
                </td>
                <td className="td2">{s.roll}</td>
                <td><Bdg type="blue" label={`Class ${s.class}`}/></td>
                <td className="td2">Div {s.div}</td>
                <td><Bdg type={s.status==="active"?"green":"yellow"} label={s.status==="active"?"Enrolled":"Dropped"}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ─── DASHBOARD ─────────────────────────────────────────────────── */
function DashboardPage({ onNav }) {
  // Exam performance trend data: exams on X, student/participation count on Y
  const trendData = [
    { label:"Annual Scholar...", count:640, type:"Scholarship", color:"#10B981" },
    { label:"ICS Regional...", count:390, type:"Olympiad", color:"#2563EB" },
    { label:"English Profic...", count:280, type:"Proficiency", color:"#F97316" },
    { label:"Science Apt...", count:320, type:"Aptitude", color:"#7C3AED" },
    { label:"Math Olympiad Q1", count:560, type:"Olympiad", color:"#2563EB" },
    { label:"State Olympiad...", count:480, type:"Olympiad", color:"#2563EB" },
  ];
  // const maxCount = Math.max(...trendData.map(d=>d.count));
  const yTicks = [0,200,400,600,800];

  return (
    <>
      <div className="sg">
        {[
          {icon:"school",label:"Total Schools",val:"142",change:"+8",up:true,color:"#EFF6FF",ic:"#2563EB"},
          {icon:"student",label:"Total Students",val:"12,480",change:"+12%",up:true,color:"#ECFDF5",ic:"#10B981"},
          {icon:"exam",label:"Active Exams",val:"28",change:"+3",up:true,color:"#FFF7ED",ic:"#F97316"},
          {icon:"fees",label:"Pending Fees",val:"₹4.2L",change:"-5%",up:false,color:"#FEF2F2",ic:"#EF4444"},
        ].map(s=>(
          <div className="sc" key={s.label}>
            <div className="sc-top">
              <div className="sc-ic" style={{background:s.color}}><IC n={s.icon} s={20} c={s.ic}/></div>
              <span className={`sc-ch ${s.up?"up":"dn"}`}>{s.up?"↑":"↓"} {s.change}</span>
            </div>
            <div className="sc-val">{s.val}</div>
            <div className="sc-lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
        {[
          {label:"Add School",icon:"school",bg:"#2563EB",c:"#fff",page:"schools"},
          {label:"Create Exam",icon:"exam",bg:"#ECFDF5",c:"#10B981",page:"exams"},
          {label:"Add Student",icon:"student",bg:"#EFF6FF",c:"#2563EB",page:"students"},
          {label:"Add Teacher",icon:"teacher",bg:"#FFF7ED",c:"#F97316",page:"teachers"},
          {label:"View Reports",icon:"report",bg:"#F5F3FF",c:"#7C3AED",page:"reports"},
        ].map(b=>(
          <button key={b.label} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:"var(--rad2)",background:b.bg,color:b.c,fontSize:13,fontWeight:600,cursor:"pointer",border:"none",fontFamily:"inherit",transition:"all .15s"}} onClick={()=>onNav(b.page)}>
            <IC n={b.icon} s={15} c={b.c}/>{b.label}
          </button>
        ))}
      </div>

      <div className="cg2">
        {/* EXAM PERFORMANCE TREND CHART */}
        <div className="card cp">
          <div className="sh2">
            <div>
              <div className="sh2-t">Exam Performance Trend</div>
              <div className="sh2-s">Student participation count per exam</div>
            </div>
            <div style={{display:"flex",gap:6}}>
              <button className="btn btn-g btn-sm">2024–25</button>
              <button className="btn btn-p btn-sm">All Time</button>
            </div>
          </div>

          {/* Y-axis + bars */}
          <div style={{display:"flex",gap:0}}>
            {/* Y labels */}
            <div style={{display:"flex",flexDirection:"column-reverse",justifyContent:"space-between",paddingBottom:28,paddingRight:8,width:36}}>
              {yTicks.map(t=><span key={t} style={{fontSize:9,color:"var(--t3)",fontWeight:600,textAlign:"right"}}>{t===0?"0":t>=1000?`${t/1000}k`:t}</span>)}
            </div>
            {/* Chart area */}
            <div style={{flex:1}}>
              {/* Grid lines */}
              <div style={{position:"relative",height:160,borderLeft:"1px solid var(--bd)",borderBottom:"1px solid var(--bd)"}}>
                {/* Grid */}
                {yTicks.slice(1).map(t=>(
                  <div key={t} style={{position:"absolute",left:0,right:0,bottom:`${(t/800)*100}%`,borderTop:"1px dashed #E2E8F0"}}/>
                ))}
                {/* Bars */}
                <div style={{display:"flex",alignItems:"flex-end",gap:10,height:"100%",padding:"0 8px"}}>
                  {trendData.map((d,i)=>{
                    const h = (d.count/800)*100;
                    return (
                      <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",height:"100%",justifyContent:"flex-end",gap:0}}>
                        <div style={{fontSize:10,fontWeight:700,color:d.color,marginBottom:3}}>{d.count}</div>
                        <div
                          style={{width:"100%",height:`${h}%`,background:d.color,borderRadius:"4px 4px 0 0",opacity:.88,cursor:"pointer",transition:"opacity .2s",position:"relative",minHeight:4}}
                          title={`${d.label}: ${d.count} students`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* X labels */}
              <div style={{display:"flex",gap:10,padding:"6px 8px 0"}}>
                {trendData.map((d,i)=>(
                  <div key={i} style={{flex:1,textAlign:"center",fontSize:9.5,color:"var(--t3)",fontWeight:500,lineHeight:1.3}}>{d.label}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:16,marginTop:12,flexWrap:"wrap"}}>
            {[{c:"#2563EB",l:"Olympiad"},{c:"#10B981",l:"Scholarship"},{c:"#7C3AED",l:"Aptitude"},{c:"#F97316",l:"Proficiency"}].map(l=>(
              <div key={l.l} style={{display:"flex",alignItems:"center",gap:5}}>
                <div style={{width:10,height:10,borderRadius:3,background:l.c}}/>
                <span style={{fontSize:11.5,color:"var(--t2)"}}>{l.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FEES COLLECTION */}
        <div className="card cp">
          <div className="sh2"><div><div className="sh2-t">Fees Collection</div><div className="sh2-s">Overall status this term</div></div></div>
          <div style={{display:"flex",alignItems:"center",gap:24}}>
            <div className="donut"><div className="dhole"><div className="dv">78%</div><div className="ds">Collected</div></div></div>
            <div className="lgnd">
              {[{l:"Paid",v:"₹8.2L",c:"#10B981"},{l:"Processing",v:"₹1.8L",c:"#2563EB"},{l:"Overdue",v:"₹0.9L",c:"#F59E0B"},{l:"Defaulted",v:"₹0.4L",c:"#EF4444"}].map(x=>(
                <div className="li" key={x.l}><div className="ld" style={{background:x.c}}/><span className="lt">{x.l}</span><span className="lv">{x.v}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top schools */}
      <div className="card cp">
        <div className="sh2"><div className="sh2-t">Top Schools by Students</div></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 32px"}}>
          {SCHOOLS.slice(0,6).map((s,i)=>(
            <div key={i} style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:13,fontWeight:600}}>{s.name}</span>
                <span style={{fontSize:12,color:"var(--t3)"}}>{s.students}</span>
              </div>
              <div className="pw"><div className="pf pb" style={{width:`${Math.max(20,(s.students/15)*100)}%`}}/></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── SCHOOLS PAGE ──────────────────────────────────────────────── */
function SchoolsPage({ onSchoolClick }) {
  const [q, setQ] = useState("");
  const [examFilter, setExamFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => SCHOOLS.filter(s => {
    const matchQ = [s.name, s.location, s.district].join(" ").toLowerCase().includes(q.toLowerCase());
    const matchExam = examFilter === "All" || s.exams.includes(examFilter);
    const matchStatus = statusFilter === "All" || s.status === statusFilter.toLowerCase();
    return matchQ && matchExam && matchStatus;
  }), [q, examFilter, statusFilter]);

  return (
    <>
      <div className="ph"><div className="ph-ttl">Schools Management</div><div className="ph-sub">Manage all affiliated schools · Click a school to view its students</div></div>
      <div className="tb">
        <SearchBar value={q} onChange={setQ} placeholder="Search schools, location…"/>
        <select className="sel" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
          <option>All</option><option>Active</option><option>Inactive</option>
        </select>
        <button className="btn btn-p" style={{marginLeft:"auto"}}><IC n="plus" s={15} c="#fff"/> Add School</button>
        <button className="btn btn-o"><IC n="upload" s={15} c="#2563EB"/> Upload Excel</button>
        <button className="btn btn-g"><IC n="download" s={14}/> Export</button>
      </div>

      {/* Exam filter pills */}
      <div className="pill-row" style={{marginBottom:16}}>
        {EXAMS.map(e=>(
          <button key={e} className={`pill ${examFilter===e?"active":""}`} onClick={()=>setExamFilter(e)}>{e}</button>
        ))}
        <span style={{marginLeft:8,fontSize:12,color:"var(--t3)",alignSelf:"center"}}>{filtered.length} school{filtered.length!==1?"s":""} found</span>
      </div>

      <div className="card">
        <div className="tw">
          <table>
            <thead><tr><th>School Name</th><th>Location</th><th>District</th><th>Students</th><th>Teachers</th><th>Exams</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length===0 ? (
                <tr><td colSpan={8}><div className="empty"><div className="empty-ic">🏫</div><div className="empty-t">No schools match</div><div className="empty-s">Try adjusting your filters</div></div></td></tr>
              ) : filtered.map(s=>(
                <tr key={s.id} style={{cursor:"pointer"}} onClick={()=>onSchoolClick(s)}>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div className="sav">{s.code}</div>
                      <span className="tdb" style={{color:"var(--p)"}}>{s.name}</span>
                    </div>
                  </td>
                  <td className="td2">{s.location}</td>
                  <td className="td2">{s.district}</td>
                  <td><span style={{fontWeight:600}}>{s.students}</span></td>
                  <td className="td2">{s.teachers}</td>
                  <td>
                    <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                      {s.exams.map(e=><span key={e} className="chip" style={{fontSize:10}}>{e}</span>)}
                    </div>
                  </td>
                  <td><Bdg type={s.status==="active"?"green":"yellow"} label={s.status==="active"?"Active":"Inactive"}/></td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="row-acts">
                      <button className="btn btn-g btn-sm" onClick={()=>onSchoolClick(s)}><IC n="users" s={13}/></button>
                      <button className="btn btn-g btn-sm"><IC n="edit" s={13}/></button>
                      <button className="btn btn-dn btn-sm"><IC n="trash" s={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ─── TEACHERS PAGE ─────────────────────────────────────────────── */
function TeachersPage({ onDrawer }) {
  const [q, setQ] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [examFilter, setExamFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const subjects = ["All Subjects", ...new Set(TEACHERS_DATA.map(t=>t.subject))];

  const filtered = useMemo(() => TEACHERS_DATA.filter(t => {
    const matchQ = [t.name, t.mobile, t.school, t.subject].join(" ").toLowerCase().includes(q.toLowerCase());
    const matchSub = subjectFilter==="All Subjects" || t.subject===subjectFilter;
    const matchExam = examFilter==="All" || t.examNames.includes(examFilter);
    const matchStatus = statusFilter==="All" || t.status===statusFilter.toLowerCase();
    return matchQ && matchSub && matchExam && matchStatus;
  }), [q, subjectFilter, examFilter, statusFilter]);

  return (
    <>
      <div className="ph"><div className="ph-ttl">Teachers Management</div><div className="ph-sub">Manage all registered teachers and exam assignments</div></div>
      <div className="tb">
        <SearchBar value={q} onChange={setQ} placeholder="Search teachers, school…"/>
        <select className="sel" value={subjectFilter} onChange={e=>setSubjectFilter(e.target.value)}>
          {subjects.map(s=><option key={s}>{s}</option>)}
        </select>
        <select className="sel" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
          <option>All</option><option>Active</option><option>Inactive</option>
        </select>
        <button className="btn btn-p" style={{marginLeft:"auto"}}><IC n="plus" s={15} c="#fff"/> Add Teacher</button>
        <button className="btn btn-o"><IC n="upload" s={15} c="#2563EB"/> Bulk Import</button>
        <button className="btn btn-g"><IC n="download" s={14}/> Export</button>
      </div>
      <div className="pill-row" style={{marginBottom:16}}>
        {EXAMS.map(e=>(
          <button key={e} className={`pill ${examFilter===e?"active":""}`} onClick={()=>setExamFilter(e)}>{e}</button>
        ))}
        <span style={{marginLeft:8,fontSize:12,color:"var(--t3)",alignSelf:"center"}}>{filtered.length} teacher{filtered.length!==1?"s":""}</span>
      </div>
      <div className="card">
        <div className="tw">
          <table>
            <thead><tr><th>Teacher Name</th><th>Mobile</th><th>Subject</th><th>Students Count</th><th>Assigned Exams</th><th>School</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length===0 ? (
                <tr><td colSpan={8}><div className="empty"><div className="empty-ic">👩‍🏫</div><div className="empty-t">No teachers found</div><div className="empty-s">Adjust your search or filters</div></div></td></tr>
              ) : filtered.map(t=>(
                <tr key={t.id}>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div className="av" style={{width:32,height:32,fontSize:11}}>{t.initials}</div>
                      <span className="tdb">{t.name}</span>
                    </div>
                  </td>
                  <td className="td2">{t.mobile}</td>
                  <td className="td2">{t.subject}</td>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <IC n="student" s={13} c="#2563EB"/>
                      <span style={{fontWeight:700,color:"var(--p)"}}>{t.studentCount}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                      {t.examNames.map(e=><span key={e} className="chip" style={{fontSize:10}}>{e}</span>)}
                    </div>
                  </td>
                  <td className="td2">{t.school}</td>
                  <td><Bdg type={t.status==="active"?"green":"yellow"} label={t.status==="active"?"Active":"Inactive"}/></td>
                  <td>
                    <div className="row-acts">
                      <button className="btn btn-p btn-sm" onClick={()=>onDrawer(t)}>View</button>
                      <button className="btn btn-g btn-sm"><IC n="edit" s={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ─── STUDENTS PAGE ─────────────────────────────────────────────── */
function StudentsPage() {
  const [q, setQ] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("All Schools");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [divFilter, setDivFilter] = useState("All Divisions");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => STUDENTS_DATA.filter(s => {
    const school = SCHOOLS.find(sc=>sc.id===s.schoolId);
    const matchQ = [s.name, s.roll, school?.name||""].join(" ").toLowerCase().includes(q.toLowerCase());
    const matchSchool = schoolFilter==="All Schools" || school?.name===schoolFilter;
    const matchClass = classFilter==="All Classes" || `Class ${s.class}`===classFilter;
    const matchDiv = divFilter==="All Divisions" || `Div ${s.div}`===divFilter;
    const matchStatus = statusFilter==="All" || s.status===statusFilter.toLowerCase();
    return matchQ && matchSchool && matchClass && matchDiv && matchStatus;
  }), [q, schoolFilter, classFilter, divFilter, statusFilter]);

  return (
    <>
      <div className="ph"><div className="ph-ttl">Students Management</div><div className="ph-sub">All enrolled students across affiliated schools</div></div>
      <div className="tb">
        <SearchBar value={q} onChange={setQ} placeholder="Search students, roll no…"/>
        <select className="sel" value={schoolFilter} onChange={e=>setSchoolFilter(e.target.value)}>
          <option>All Schools</option>{SCHOOLS.map(s=><option key={s.id}>{s.name}</option>)}
        </select>
        <select className="sel" value={classFilter} onChange={e=>setClassFilter(e.target.value)}>
          <option>All Classes</option>{["7","8","9","10"].map(c=><option key={c}>Class {c}</option>)}
        </select>
        <select className="sel" value={divFilter} onChange={e=>setDivFilter(e.target.value)}>
          <option>All Divisions</option>{["A","B","C"].map(d=><option key={d}>Div {d}</option>)}
        </select>
        <select className="sel" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
          <option>All</option><option>Active</option><option>Inactive</option>
        </select>
        <button className="btn btn-p" style={{marginLeft:"auto"}}><IC n="plus" s={15} c="#fff"/> Add Student</button>
        <button className="btn btn-o"><IC n="upload" s={15} c="#2563EB"/> Upload Excel</button>
        <button className="btn btn-g"><IC n="download" s={14}/> Export</button>
      </div>
      <div style={{marginBottom:12,fontSize:12.5,color:"var(--t3)"}}>{filtered.length} student{filtered.length!==1?"s":""} found</div>
      <div className="card">
        <div className="tw">
          <table>
            <thead><tr><th>Student Name</th><th>Roll No.</th><th>Class</th><th>Division</th><th>School</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length===0 ? (
                <tr><td colSpan={7}><div className="empty"><div className="empty-ic">🎓</div><div className="empty-t">No students match</div><div className="empty-s">Try a different filter</div></div></td></tr>
              ) : filtered.map((s,i)=>{
                const school = SCHOOLS.find(sc=>sc.id===s.schoolId);
                return (
                  <tr key={s.id}>
                    <td>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div className="av" style={{width:30,height:30,fontSize:11,background:`hsl(${i*55+190},58%,52%)`}}>{s.name[0]}</div>
                        <span className="tdb">{s.name}</span>
                      </div>
                    </td>
                    <td className="td2">{s.roll}</td>
                    <td><Bdg type="blue" label={`Class ${s.class}`}/></td>
                    <td className="td2">Div {s.div}</td>
                    <td className="td2">{school?.name||"—"}</td>
                    <td><Bdg type={s.status==="active"?"green":"yellow"} label={s.status==="active"?"Enrolled":"Dropped"}/></td>
                    <td>
                      <div className="row-acts">
                        <button className="btn btn-g btn-sm"><IC n="eye" s={13}/></button>
                        <button className="btn btn-g btn-sm"><IC n="edit" s={13}/></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ─── EXAMS PAGE ────────────────────────────────────────────────── */
function ExamsPage() {
  const [tab, setTab] = useState("list");
  const [q, setQ] = useState("");
  const [examFilter, setExamFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => EXAMS_DATA.filter(e => {
    const matchQ = [e.name, e.teacher, e.type].join(" ").toLowerCase().includes(q.toLowerCase());
    const matchExam = examFilter==="All" || e.exam===examFilter;
    const matchStatus = statusFilter==="All" || e.status===statusFilter.toLowerCase();
    return matchQ && matchExam && matchStatus;
  }), [q, examFilter, statusFilter]);

  return (
    <>
      <div className="ph"><div className="ph-ttl">Exams Management</div><div className="ph-sub">Create, schedule and manage competitive exams</div></div>
      <div className="tabs">
        <button className={`tab ${tab==="list"?"active":""}`} onClick={()=>setTab("list")}>Exam List</button>
        <button className={`tab ${tab==="create"?"active":""}`} onClick={()=>setTab("create")}>Create Exam</button>
      </div>
      {tab==="list" ? (
        <>
          <div className="tb">
            <SearchBar value={q} onChange={setQ} placeholder="Search exams, teacher…"/>
            <select className="sel" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
              <option>All</option><option>Active</option><option>Upcoming</option><option>Completed</option>
            </select>
            <button className="btn btn-p" style={{marginLeft:"auto"}} onClick={()=>setTab("create")}><IC n="plus" s={15} c="#fff"/> Create Exam</button>
            <button className="btn btn-g"><IC n="filter" s={14}/> Filter</button>
            <button className="btn btn-g"><IC n="download" s={14}/> Export</button>
          </div>
          <div className="pill-row" style={{marginBottom:16}}>
            {EXAMS.map(e=>(
              <button key={e} className={`pill ${examFilter===e?"active":""}`} onClick={()=>setExamFilter(e)}>{e}</button>
            ))}
            <span style={{marginLeft:8,fontSize:12,color:"var(--t3)",alignSelf:"center"}}>{filtered.length} exam{filtered.length!==1?"s":""}</span>
          </div>
          <div className="card">
            <div className="tw">
              <table>
                <thead><tr><th>Exam Name</th><th>Category</th><th>Type</th><th>Date</th><th>Teacher</th><th>Students</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {filtered.length===0 ? (
                    <tr><td colSpan={8}><div className="empty"><div className="empty-ic">📝</div><div className="empty-t">No exams found</div></div></td></tr>
                  ) : filtered.map((e,i)=>(
                    <tr key={i}>
                      <td className="tdb">{e.name}</td>
                      <td><span className="chip">{e.exam}</span></td>
                      <td><Bdg type="blue" label={e.type}/></td>
                      <td className="td2">{e.date}</td>
                      <td className="td2">{e.teacher}</td>
                      <td style={{fontWeight:600}}>{e.students}</td>
                      <td><Bdg type={e.status==="completed"?"green":e.status==="active"?"blue":"yellow"} label={e.status.charAt(0).toUpperCase()+e.status.slice(1)}/></td>
                      <td><div className="row-acts"><button className="btn btn-g btn-sm"><IC n="eye" s={13}/></button><button className="btn btn-g btn-sm"><IC n="edit" s={13}/></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="card cp" style={{maxWidth:680}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:20}}>Create New Exam</div>
          <div className="g2">
            <div className="fg"><label className="fl">Exam Name *</label><input className="fi" placeholder="e.g. State Level Olympiad 2025"/></div>
            <div className="fg"><label className="fl">Category *</label><select className="fi"><option>Select…</option>{["Manthan","Shabbas","ICS"].map(e=><option key={e}>{e}</option>)}</select></div>
            <div className="fg"><label className="fl">Exam Type</label><select className="fi"><option>Olympiad</option><option>Aptitude</option><option>Scholarship</option><option>Proficiency</option></select></div>
            <div className="fg"><label className="fl">Exam Date *</label><input className="fi" type="date"/></div>
            <div className="fg"><label className="fl">Exam Time</label><input className="fi" type="time"/></div>
            <div className="fg"><label className="fl">Assign Teacher *</label><select className="fi"><option>Select teacher…</option>{TEACHERS_DATA.map(t=><option key={t.id}>{t.name}</option>)}</select></div>
            <div className="fg"><label className="fl">Assign Center</label><select className="fi"><option>Select center…</option>{CENTERS_DATA.map(c=><option key={c.name}>{c.name}</option>)}</select></div>
            <div className="fg"><label className="fl">Max Students</label><input className="fi" type="number" placeholder="e.g. 500"/></div>
            <div className="fg"><label className="fl">Duration (mins)</label><input className="fi" type="number" placeholder="e.g. 120"/></div>
            <div className="fg gff"><label className="fl">Description</label><textarea className="ta" placeholder="Brief description…"/></div>
            <div className="fg gff" style={{flexDirection:"row",gap:10,marginTop:4}}>
              <button className="btn btn-p"><IC n="check" s={14} c="#fff"/> Create Exam</button>
              <button className="btn btn-g" onClick={()=>setTab("list")}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── BOOKS PAGE ────────────────────────────────────────────────── */
function BooksPage() {
  const [q, setQ] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("All Schools");
  const [stockFilter, setStockFilter] = useState("All");

  const filtered = useMemo(() => BOOKS_DATA.filter(b => {
    const matchQ = [b.teacher, b.school].join(" ").toLowerCase().includes(q.toLowerCase());
    const matchSchool = schoolFilter==="All Schools" || b.school===schoolFilter;
    const matchStock = stockFilter==="All" || b.status===stockFilter.toLowerCase();
    return matchQ && matchSchool && matchStock;
  }), [q, schoolFilter, stockFilter]);

  const totalPurchased = BOOKS_DATA.reduce((a,b)=>a+b.purchased,0);
  const totalStudents = BOOKS_DATA.reduce((a,b)=>a+b.students,0);
  const criticalCount = BOOKS_DATA.filter(b=>b.status==="critical").length;
  const lowCount = BOOKS_DATA.filter(b=>b.status==="low").length;

  return (
    <>
      <div className="ph"><div className="ph-ttl">Books Tracking</div><div className="ph-sub">Monitor book purchases and distribution across teachers</div></div>
      <div className="mini-stats">
        {[["Total Books Purchased", totalPurchased, "#EFF6FF","#2563EB"], ["Total Students", totalStudents,"#ECFDF5","#10B981"], ["Low Stock Teachers", lowCount,"#FFFBEB","#F59E0B"], ["Critical Stock", criticalCount,"#FEF2F2","#EF4444"]].map(([l,v,bg,c])=>(
          <div key={l} className="mini-s" style={{background:bg}}>
            <div className="mini-v" style={{color:c}}>{v}</div>
            <div className="mini-l">{l}</div>
          </div>
        ))}
      </div>
      <div className="tb">
        <SearchBar value={q} onChange={setQ} placeholder="Search teacher, school…"/>
        <select className="sel" value={schoolFilter} onChange={e=>setSchoolFilter(e.target.value)}>
          <option>All Schools</option>{SCHOOLS.map(s=><option key={s.id}>{s.name}</option>)}
        </select>
        <select className="sel" value={stockFilter} onChange={e=>setStockFilter(e.target.value)}>
          <option>All</option><option>Ok</option><option>Low</option><option>Critical</option>
        </select>
        <button className="btn btn-g" style={{marginLeft:"auto"}}><IC n="download" s={14}/> Export</button>
      </div>
      <div className="card">
        <div className="tw">
          <table>
            <thead><tr><th>Teacher Name</th><th>School</th><th>Books Purchased</th><th>Students</th><th>Stock Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length===0 ? (
                <tr><td colSpan={6}><div className="empty"><div className="empty-ic">📚</div><div className="empty-t">No records found</div></div></td></tr>
              ) : filtered.map((b,i)=>(
                <tr key={i} className={b.status==="critical"?"warn-row":b.status==="low"?"low-row":""}>
                  <td className="tdb">{b.teacher}</td>
                  <td className="td2">{b.school}</td>
                  <td style={{fontWeight:700}}>{b.purchased}</td>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <IC n="users" s={13} c="#2563EB"/>
                      <span style={{fontWeight:600,color:"var(--p)"}}>{b.students}</span>
                    </div>
                  </td>
                  <td><Bdg type={b.status==="critical"?"red":b.status==="low"?"yellow":"green"} label={b.status==="critical"?"Critical":b.status==="low"?"Low Stock":"Sufficient"}/></td>
                  <td><div className="row-acts"><button className="btn btn-g btn-sm">Remind</button><button className="btn btn-g btn-sm"><IC n="edit" s={13}/></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ─── FEES PAGE ─────────────────────────────────────────────────── */
function FeesPage() {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [schoolFilter, setSchoolFilter] = useState("All Schools");

  const filtered = useMemo(() => FEES_DATA.filter(f => {
    const matchQ = [f.teacher, f.school].join(" ").toLowerCase().includes(q.toLowerCase());
    const matchStatus = statusFilter==="All" || f.status===statusFilter.toLowerCase();
    const matchSchool = schoolFilter==="All Schools" || f.school===schoolFilter;
    return matchQ && matchStatus && matchSchool;
  }), [q, statusFilter, schoolFilter]);

  const total = FEES_DATA.reduce((a,f)=>a+f.total,0);
  const paid = FEES_DATA.reduce((a,f)=>a+f.paid,0);
  const pending = FEES_DATA.reduce((a,f)=>a+f.pending,0);

  return (
    <>
      <div className="ph"><div className="ph-ttl">Fees Management</div><div className="ph-sub">Track exam fees payments and pending dues</div></div>
      <div className="mini-stats">
        {[[`₹${(total/1000).toFixed(0)}k`,"Total Fees","#EFF6FF","#2563EB"],[`₹${(paid/1000).toFixed(0)}k`,"Collected","#ECFDF5","#10B981"],[`₹${(pending/1000).toFixed(0)}k`,"Pending","#FEF2F2","#EF4444"]].map(([v,l,bg,c])=>(
          <div key={l} className="mini-s" style={{background:bg}}>
            <div className="mini-v" style={{color:c}}>{v}</div>
            <div className="mini-l">{l}</div>
          </div>
        ))}
        <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
          <button className="btn btn-p"><IC n="send" s={14} c="#fff"/> Send Reminders</button>
          <button className="btn btn-g"><IC n="download" s={14}/> Export</button>
        </div>
      </div>
      <div className="tb">
        <SearchBar value={q} onChange={setQ} placeholder="Search teacher, school…"/>
        <select className="sel" value={schoolFilter} onChange={e=>setSchoolFilter(e.target.value)}>
          <option>All Schools</option>{SCHOOLS.map(s=><option key={s.id}>{s.name}</option>)}
        </select>
        <div className="pill-row">
          {["All","Paid","Partial","Pending"].map(s=>(
            <button key={s} className={`pill ${statusFilter===s?"active":""}`} onClick={()=>setStatusFilter(s)}>{s}</button>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="tw">
          <table>
            <thead><tr><th>Teacher Name</th><th>School</th><th>Total Fees</th><th>Paid</th><th>Pending</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length===0 ? (
                <tr><td colSpan={7}><div className="empty"><div className="empty-ic">💳</div><div className="empty-t">No records match</div></div></td></tr>
              ) : filtered.map((f,i)=>(
                <tr key={i}>
                  <td className="tdb">{f.teacher}</td>
                  <td className="td2">{f.school}</td>
                  <td style={{fontWeight:600}}>₹{f.total.toLocaleString()}</td>
                  <td style={{color:"var(--g)",fontWeight:600}}>₹{f.paid.toLocaleString()}</td>
                  <td style={{color:f.pending>0?"var(--r)":"var(--t3)",fontWeight:600}}>{f.pending>0?`₹${f.pending.toLocaleString()}`:"—"}</td>
                  <td><Bdg type={f.status==="paid"?"green":f.status==="partial"?"yellow":"red"} label={f.status.charAt(0).toUpperCase()+f.status.slice(1)}/></td>
                  <td>
                    <div className="row-acts">
                      {f.pending>0 && <button className="btn btn-o btn-sm">Remind</button>}
                      <button className="btn btn-g btn-sm"><IC n="eye" s={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ─── CENTERS PAGE ──────────────────────────────────────────────── */
function CentersPage() {
  const [q, setQ] = useState("");
  const [capFilter, setCapFilter] = useState("All");

  const filtered = useMemo(() => CENTERS_DATA.filter(c => {
    const pct = Math.round((c.assigned/c.capacity)*100);
    const status = pct>=100?"full":pct>80?"high":"ok";
    const matchQ = [c.name, c.city].join(" ").toLowerCase().includes(q.toLowerCase());
    const matchCap = capFilter==="All" || (capFilter==="Full" && status==="full") || (capFilter==="High" && status==="high") || (capFilter==="Available" && status==="ok");
    return matchQ && matchCap;
  }), [q, capFilter]);

  return (
    <>
      <div className="ph"><div className="ph-ttl">Centers Management</div><div className="ph-sub">Manage exam centers, capacity and assignments</div></div>
      <div className="tb">
        <SearchBar value={q} onChange={setQ} placeholder="Search center, city…"/>
        <div className="pill-row">
          {["All","Available","High","Full"].map(s=>(
            <button key={s} className={`pill ${capFilter===s?"active":""}`} onClick={()=>setCapFilter(s)}>{s}</button>
          ))}
        </div>
        <button className="btn btn-p" style={{marginLeft:"auto"}}><IC n="plus" s={15} c="#fff"/> Add Center</button>
        <button className="btn btn-g"><IC n="download" s={14}/> Export</button>
      </div>
      <div className="card">
        <div className="tw">
          <table>
            <thead><tr><th>Center Name</th><th>City</th><th>Capacity</th><th>Assigned</th><th>Occupancy</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length===0 ? (
                <tr><td colSpan={7}><div className="empty"><div className="empty-ic">📍</div><div className="empty-t">No centers match</div></div></td></tr>
              ) : filtered.map((c,i)=>{
                const pct = Math.round((c.assigned/c.capacity)*100);
                const isFull = pct>=100;
                return (
                  <tr key={i}>
                    <td className="tdb">{c.name}</td>
                    <td className="td2">{c.city}</td>
                    <td>{c.capacity}</td>
                    <td style={{fontWeight:600,color:isFull?"var(--r)":"var(--t1)"}}>{c.assigned}</td>
                    <td style={{minWidth:130}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <div className="pw" style={{flex:1}}><div className={`pf ${pct>=100?"pr":pct>80?"py":"pb"}`} style={{width:`${Math.min(pct,100)}%`}}/></div>
                        <span style={{fontSize:12,fontWeight:600,color:"var(--t3)"}}>{pct}%</span>
                      </div>
                    </td>
                    <td>
                      {isFull
                        ? <span className="bdg bdg-r"><span className="bdg-dot"/>⚠ Full</span>
                        : pct>80
                        ? <Bdg type="yellow" label="High"/>
                        : <Bdg type="green" label="Available"/>}
                    </td>
                    <td><div className="row-acts"><button className="btn btn-g btn-sm"><IC n="eye" s={13}/></button><button className="btn btn-g btn-sm"><IC n="edit" s={13}/></button></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ─── NOTIFICATIONS PAGE ────────────────────────────────────────── */
function NotificationsPage() {
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const sent = [
    { title:"Exam Reminder - Olympiad 2025", target:"All Teachers", type:"SMS", sent:"2 hours ago", count:142 },
    { title:"Fee Payment Deadline", target:"Pending Fee Teachers", type:"Alert", sent:"1 day ago", count:28 },
    { title:"New Exam Schedule Released", target:"All Students", type:"SMS", sent:"3 days ago", count:1240 },
    { title:"Book Return Reminder", target:"Low Stock Teachers", type:"Alert", sent:"5 days ago", count:15 },
    { title:"ICS Results Published", target:"All Schools", type:"Push", sent:"1 week ago", count:890 },
  ];
  const filteredSent = sent.filter(s => {
    const matchQ = [s.title, s.target].join(" ").toLowerCase().includes(q.toLowerCase());
    const matchType = typeFilter==="All" || s.type===typeFilter;
    return matchQ && matchType;
  });

  return (
    <>
      <div className="ph"><div className="ph-ttl">Notifications</div><div className="ph-sub">Compose and send messages, SMS alerts to teachers and students</div></div>
      <div className="g2" style={{gap:20}}>
        <div>
          <div className="card cp" style={{marginBottom:16}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>Compose Message</div>
            <div className="fg" style={{marginBottom:12}}><label className="fl">Message Title</label><input className="fi" placeholder="e.g. Exam Reminder – Olympiad 2025"/></div>
            <div className="fg" style={{marginBottom:12}}><label className="fl">Send To</label><select className="fi"><option>All Teachers</option><option>All Students</option><option>Specific School</option><option>Pending Fee Teachers</option><option>Low Stock Teachers</option></select></div>
            <div className="fg" style={{marginBottom:16}}><label className="fl">Message Body</label><textarea className="ta" placeholder="Type your message here…"/></div>
            <div className="send-row">
              <button className="btn btn-p"><IC n="sms" s={14} c="#fff"/> Send SMS</button>
              <button className="btn btn-o"><IC n="alert" s={14} c="#2563EB"/> Send Alert</button>
              <button className="btn btn-g"><IC n="notif" s={14}/> Push Notify</button>
            </div>
          </div>
          <div className="card cp">
            <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Quick Templates</div>
            {["Exam Reminder","Fee Due Notice","Book Return Alert","Result Published","Schedule Update"].map(t=>(
              <div key={t} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid var(--bd)"}}>
                <span style={{fontSize:13,fontWeight:500}}>{t}</span>
                <button className="btn btn-g btn-sm">Use</button>
              </div>
            ))}
          </div>
        </div>
        <div className="card cp">
          <div className="sh2">
            <div style={{fontWeight:700,fontSize:14}}>Sent History</div>
          </div>
          <div className="tb" style={{marginBottom:12}}>
            <SearchBar value={q} onChange={setQ} placeholder="Search notifications…"/>
            <div className="pill-row">
              {["All","SMS","Alert","Push"].map(t=>(
                <button key={t} className={`pill ${typeFilter===t?"active":""}`} onClick={()=>setTypeFilter(t)}>{t}</button>
              ))}
            </div>
          </div>
          {filteredSent.length===0 ? (
            <div className="empty"><div className="empty-ic">🔔</div><div className="empty-t">No notifications match</div></div>
          ) : filteredSent.map((s,i)=>(
            <div key={i} className="ni">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <span style={{fontWeight:600,fontSize:13.5}}>{s.title}</span>
                <span className={`bdg ${s.type==="SMS"?"bdg-b":s.type==="Alert"?"bdg-y":"bdg-g"}`}><span className="bdg-dot"/>{s.type}</span>
              </div>
              <div style={{fontSize:12,color:"var(--t3)"}}>Target: {s.target}</div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
                <span style={{fontSize:12,color:"var(--t3)"}}>{s.sent}</span>
                <span style={{fontSize:12,fontWeight:600,color:"var(--g)"}}>{s.count} delivered</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── REPORTS PAGE ──────────────────────────────────────────────── */
function ReportsPage() {
  const [schoolFilter, setSchoolFilter] = useState("All Schools");
  const [examFilter, setExamFilter] = useState("All");
  const [q, setQ] = useState("");

  const perfData = [75,82,68,90,78,85,72,88,65,91,80,76];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const reportRows = [
    {school:"Ryan International",exam:"Olympiad 2025",students:480,pass:425,fail:55,pct:88,fees:"paid"},
    {school:"Delhi Public School",exam:"Aptitude Test",students:320,pass:262,fail:58,pct:82,fees:"partial"},
    {school:"Podar International",exam:"Math Olympiad",students:560,pass:443,fail:117,pct:79,fees:"paid"},
    {school:"St. Mary's Convent",exam:"Proficiency",students:280,pass:207,fail:73,pct:74,fees:"pending"},
    {school:"Kendriya Vidyalaya",exam:"ICS Regional",students:390,pass:280,fail:110,pct:72,fees:"partial"},
  ];
  const filtered = reportRows.filter(r => {
    const matchQ = [r.school, r.exam].join(" ").toLowerCase().includes(q.toLowerCase());
    const matchSchool = schoolFilter==="All Schools" || r.school===schoolFilter;
    const matchExam = examFilter==="All" || EXAMS_DATA.find(e=>e.name.includes(r.exam.split(" ")[0]))?.exam===examFilter;
    return matchQ && matchSchool;
  });

  return (
    <>
      <div className="ph"><div className="ph-ttl">Reports & Analytics</div><div className="ph-sub">Comprehensive analytics for exams, fees and performance</div></div>
      <div className="card cp" style={{marginBottom:20}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>Filters</div>
        <div className="tb" style={{flexWrap:"wrap"}}>
          <SearchBar value={q} onChange={setQ} placeholder="Search school, exam…"/>
          <select className="sel" value={schoolFilter} onChange={e=>setSchoolFilter(e.target.value)}>
            <option>All Schools</option>{SCHOOLS.map(s=><option key={s.id}>{s.name}</option>)}
          </select>
          <div className="pill-row">
            {EXAMS.map(e=>(
              <button key={e} className={`pill ${examFilter===e?"active":""}`} onClick={()=>setExamFilter(e)}>{e}</button>
            ))}
          </div>
          <button className="btn btn-g"><IC n="refresh" s={14}/> Reset</button>
          <button className="btn btn-p" style={{marginLeft:"auto"}}><IC n="download" s={14} c="#fff"/> Export PDF</button>
        </div>
      </div>

      <div className="sg" style={{marginBottom:20}}>
        {[
          {label:"Avg Pass Rate",val:"79.4%",icon:"trend",color:"#10B981",bg:"#ECFDF5"},
          {label:"Total Exams Held",val:"38",icon:"exam",color:"#2563EB",bg:"#EFF6FF"},
          {label:"Fees Collected",val:"₹47.5L",icon:"fees",color:"#7C3AED",bg:"#F5F3FF"},
          {label:"Top School",val:"Ryan Intl.",icon:"school",color:"#F97316",bg:"#FFF7ED"},
        ].map(s=>(
          <div className="sc" key={s.label}>
            <div className="sc-top"><div className="sc-ic" style={{background:s.bg}}><IC n={s.icon} s={20} c={s.color}/></div></div>
            <div className="sc-val" style={{fontSize:22}}>{s.val}</div>
            <div className="sc-lbl">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="cg2" style={{marginBottom:20}}>
        <div className="card cp">
          <div className="sh2"><div><div className="sh2-t">Monthly Pass Rate (%)</div><div className="sh2-s">All exams combined, 2024–25</div></div></div>
          <div style={{display:"flex",gap:0}}>
            <div style={{display:"flex",flexDirection:"column-reverse",justifyContent:"space-between",paddingBottom:28,paddingRight:8,width:32}}>
              {[0,25,50,75,100].map(t=><span key={t} style={{fontSize:9,color:"var(--t3)",fontWeight:600,textAlign:"right"}}>{t}%</span>)}
            </div>
            <div style={{flex:1}}>
              <div style={{position:"relative",height:140,borderLeft:"1px solid var(--bd)",borderBottom:"1px solid var(--bd)"}}>
                {[25,50,75,100].map(t=><div key={t} style={{position:"absolute",left:0,right:0,bottom:`${t}%`,borderTop:"1px dashed #E2E8F0"}}/>)}
                <div style={{display:"flex",alignItems:"flex-end",gap:6,height:"100%",padding:"0 6px"}}>
                  {perfData.map((v,i)=>(
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",height:"100%",justifyContent:"flex-end"}}>
                      <div style={{width:"100%",height:`${v}%`,background:v>85?"#10B981":v<70?"#EF4444":"#2563EB",borderRadius:"4px 4px 0 0",opacity:.85}}/>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",gap:6,padding:"6px 6px 0"}}>
                {months.map(m=><div key={m} style={{flex:1,textAlign:"center",fontSize:9,color:"var(--t3)",fontWeight:500}}>{m}</div>)}
              </div>
            </div>
          </div>
        </div>
        <div className="card cp">
          <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>School-wise Performance</div>
          {[{name:"Ryan International",rate:88},{name:"Delhi Public School",rate:82},{name:"Podar International",rate:79},{name:"St. Mary's Convent",rate:74},{name:"Kendriya Vidyalaya",rate:71}].map(s=>(
            <div key={s.name} style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:12.5,fontWeight:600}}>{s.name}</span>
                <span style={{fontSize:12.5,fontWeight:700,color:s.rate>80?"var(--g)":"var(--t2)"}}>{s.rate}%</span>
              </div>
              <div className="pw"><div className={`pf ${s.rate>80?"pg":"pb"}`} style={{width:`${s.rate}%`}}/></div>
            </div>
          ))}
        </div>
      </div>

      <div className="card cp">
        <div className="sh2">
          <div style={{fontWeight:700,fontSize:14}}>Detailed Report Table</div>
          <button className="btn btn-g btn-sm"><IC n="download" s={13}/> Export CSV</button>
        </div>
        <div className="tw">
          <table>
            <thead><tr><th>School</th><th>Exam</th><th>Students</th><th>Pass</th><th>Fail</th><th>Pass Rate</th><th>Fees Status</th></tr></thead>
            <tbody>
              {filtered.map((r,i)=>(
                <tr key={i}>
                  <td className="tdb">{r.school}</td>
                  <td className="td2">{r.exam}</td>
                  <td>{r.students}</td>
                  <td style={{color:"var(--g)",fontWeight:600}}>{r.pass}</td>
                  <td style={{color:"var(--r)",fontWeight:600}}>{r.fail}</td>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div className="pw" style={{width:60}}><div className={`pf ${r.pct>80?"pg":"pb"}`} style={{width:`${r.pct}%`}}/></div>
                      <span style={{fontSize:12.5,fontWeight:700}}>{r.pct}%</span>
                    </div>
                  </td>
                  <td><Bdg type={r.fees==="paid"?"green":r.fees==="partial"?"yellow":"red"} label={r.fees.charAt(0).toUpperCase()+r.fees.slice(1)}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ─── SETTINGS PAGE ─────────────────────────────────────────────── */
function SettingsPage() {
  const [q, setQ] = useState("");
  const settings = [
    {key:"Platform Name", val:"ExamPro Management Platform"},
    {key:"Admin Email", val:"admin@exampro.in"},
    {key:"Contact Phone", val:"+91 98765 00000"},
    {key:"Language", val:"English"},
    {key:"Timezone", val:"Asia/Kolkata (IST)"},
  ];
  const filteredSettings = settings.filter(s =>
    s.key.toLowerCase().includes(q.toLowerCase()) || s.val.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <div className="ph"><div className="ph-ttl">Settings</div><div className="ph-sub">Configure platform preferences and admin options</div></div>
      <div className="tb" style={{marginBottom:20}}>
        <SearchBar value={q} onChange={setQ} placeholder="Search settings…"/>
      </div>
      <div className="g2">
        <div>
          <div className="card cp" style={{marginBottom:16}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>General Settings</div>
            {filteredSettings.length===0 ? (
              <div className="empty"><div className="empty-ic">⚙️</div><div className="empty-t">No settings match</div></div>
            ) : (
              <div className="g2">
                <div className="fg gff"><label className="fl">Platform Name</label><input className="fi" defaultValue="ExamPro Management Platform"/></div>
                <div className="fg"><label className="fl">Admin Email</label><input className="fi" defaultValue="admin@exampro.in"/></div>
                <div className="fg"><label className="fl">Contact Phone</label><input className="fi" defaultValue="+91 98765 00000"/></div>
                <div className="fg"><label className="fl">Default Language</label><select className="fi"><option>English</option><option>Hindi</option><option>Marathi</option></select></div>
                <div className="fg"><label className="fl">Timezone</label><select className="fi"><option>Asia/Kolkata (IST)</option></select></div>
                <div className="fg gff" style={{marginTop:4}}><button className="btn btn-p">Save Changes</button></div>
              </div>
            )}
          </div>
          <div className="card cp">
            <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>Security</div>
            <div className="fg" style={{marginBottom:12}}><label className="fl">Current Password</label><input className="fi" type="password" placeholder="••••••••"/></div>
            <div className="fg" style={{marginBottom:12}}><label className="fl">New Password</label><input className="fi" type="password" placeholder="••••••••"/></div>
            <div className="fg" style={{marginBottom:4}}><label className="fl">Confirm Password</label><input className="fi" type="password" placeholder="••••••••"/></div>
            <button className="btn btn-o" style={{marginTop:12}}>Update Password</button>
          </div>
        </div>
        <div className="card cp">
          <div style={{fontWeight:700,fontSize:14,marginBottom:16}}>Notification Preferences</div>
          {[["Email Notifications","Receive alerts via email",true],["SMS Notifications","Get SMS for important updates",true],["Push Notifications","Browser push notifications",false],["Weekly Reports","Auto-send weekly summary",true],["Fee Reminders","Automated fee due reminders",true]].map(([t,s,on])=>(
            <div key={t} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid var(--bd)"}}>
              <div>
                <div style={{fontSize:13.5,fontWeight:600}}>{t}</div>
                <div style={{fontSize:12,color:"var(--t3)"}}>{s}</div>
              </div>
              <div className="tog" style={{background:on?"var(--p)":"var(--bd)"}}>
                <div className="tog-k" style={{left:on?21:3}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
