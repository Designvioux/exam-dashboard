import { useState, useMemo, useCallback } from "react";

/* ─── CSS ────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --p:#2563EB;--pl:#EFF6FF;--pm:#DBEAFE;--pd:#1D4ED8;
  --g:#10B981;--gl:#ECFDF5;--gd:#059669;
  --w:#F59E0B;--wl:#FFFBEB;--wd:#D97706;
  --r:#EF4444;--rl:#FEF2F2;--rd:#DC2626;
  --pu:#7C3AED;--pul:#F5F3FF;
  --t1:#0F172A;--t2:#475569;--t3:#94A3B8;--t4:#CBD5E1;
  --bd:#E2E8F0;--bg:#F1F5F9;--wh:#FFFFFF;
  --sw:252px;--r1:10px;--r2:8px;--r3:6px;
}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--t1);-webkit-font-smoothing:antialiased}
.app{display:flex;height:100vh;overflow:hidden}

/* Sidebar */
.sidebar{width:var(--sw);min-width:var(--sw);background:var(--wh);border-right:1px solid var(--bd);display:flex;flex-direction:column;overflow-y:auto;z-index:50}
.sidebar::-webkit-scrollbar{width:3px}.sidebar::-webkit-scrollbar-thumb{background:var(--t4)}
.sb-logo{display:flex;align-items:center;gap:10px;padding:18px 16px 14px;border-bottom:1px solid var(--bd)}
.sb-logo-ic{width:36px;height:36px;background:linear-gradient(135deg,#2563EB,#4F46E5);border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 10px rgba(37,99,235,.28)}
.sb-logo-name{font-size:14px;font-weight:800;color:var(--t1)}
.sb-logo-sub{font-size:10px;color:var(--t3);margin-top:1px}
.sb-sec{padding:12px 10px 4px}
.sb-lbl{font-size:9.5px;font-weight:700;color:var(--t4);text-transform:uppercase;letter-spacing:.08em;padding:0 8px 7px}
.nv{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:var(--r3);cursor:pointer;font-size:12.5px;font-weight:500;color:var(--t2);margin-bottom:1px;transition:all .14s}
.nv:hover{background:var(--bg);color:var(--t1)}
.nv.on{background:var(--pl);color:var(--p);font-weight:600}
.nv.on svg{opacity:1;color:var(--p)}
.nv svg{opacity:.55;flex-shrink:0}
.nbadge{margin-left:auto;font-size:9px;font-weight:700;padding:2px 6px;border-radius:20px;background:var(--r);color:#fff;min-width:17px;text-align:center}
.nbadge.bl{background:var(--p)}
.sb-foot{margin-top:auto;padding:10px;border-top:1px solid var(--bd)}
.sb-user{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:var(--r3);cursor:pointer;transition:background .14s}
.sb-user:hover{background:var(--bg)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}

/* Header */
.hdr{height:58px;min-height:58px;background:var(--wh);border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:12px;padding:0 20px;z-index:30}
.hdr-title{font-size:14.5px;font-weight:700;color:var(--t1)}
.hsr{flex:1;max-width:280px;margin-left:auto;display:flex;align-items:center;gap:7px;background:var(--bg);border:1.5px solid var(--bd);border-radius:var(--r2);padding:7px 12px;transition:border-color .14s}
.hsr:focus-within{border-color:var(--p)}
.hsr input{background:none;border:none;outline:none;font-family:inherit;font-size:12.5px;color:var(--t1);width:100%}
.hsr input::placeholder{color:var(--t3)}
.hacts{display:flex;align-items:center;gap:6px;margin-left:10px}
.hbtn{width:34px;height:34px;border-radius:var(--r3);display:flex;align-items:center;justify-content:center;border:1.5px solid var(--bd);background:var(--wh);cursor:pointer;color:var(--t2);transition:all .14s;position:relative;flex-shrink:0}
.hbtn:hover,.hbtn.on{background:var(--pl);color:var(--p);border-color:var(--pm)}
.hdot{position:absolute;top:5px;right:5px;width:7px;height:7px;background:var(--r);border-radius:50%;border:2px solid #fff}
.hav{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#2563EB,#7C3AED);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;cursor:pointer;border:2px solid transparent;transition:all .14s;flex-shrink:0}
.hav:hover,.hav.on{border-color:var(--p);box-shadow:0 0 0 3px rgba(37,99,235,.15)}
.cnt{flex:1;overflow-y:auto;padding:20px}
.cnt::-webkit-scrollbar{width:4px}.cnt::-webkit-scrollbar-thumb{background:var(--t4);border-radius:4px}

/* Cards */
.card{background:var(--wh);border-radius:var(--r1);border:1px solid var(--bd);box-shadow:0 1px 3px rgba(0,0,0,.06)}
.cp{padding:18px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.gchart{display:grid;grid-template-columns:1.65fr 1fr;gap:14px}

/* Stat cards */
.sg{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}
.sc{background:var(--wh);border-radius:var(--r1);border:1px solid var(--bd);padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.06);cursor:pointer;transition:all .18s}
.sc:hover{box-shadow:0 4px 16px rgba(0,0,0,.08);transform:translateY(-1px);border-color:var(--pm)}
.sc-ic{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
.sc-val{font-size:26px;font-weight:800;color:var(--t1);letter-spacing:-.5px}
.sc-lbl{font-size:12px;color:var(--t2);margin-top:3px;font-weight:500}
.sc-chg{font-size:11px;font-weight:600;padding:2px 7px;border-radius:20px;float:right;margin-top:-2px}
.sc-chg.up{background:var(--gl);color:var(--gd)}.sc-chg.dn{background:var(--rl);color:var(--rd)}

/* Buttons */
.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:var(--r3);font-family:inherit;font-size:12px;font-weight:600;cursor:pointer;border:none;transition:all .14s;white-space:nowrap;line-height:1}
.btn-p{background:var(--p);color:#fff}.btn-p:hover{background:var(--pd);box-shadow:0 3px 10px rgba(37,99,235,.3)}
.btn-o{background:transparent;color:var(--p);border:1.5px solid var(--p)}.btn-o:hover{background:var(--pl)}
.btn-g{background:var(--bg);color:var(--t2);border:1.5px solid var(--bd)}.btn-g:hover{background:var(--bd);color:var(--t1)}
.btn-d{background:var(--rl);color:var(--rd);border:1.5px solid #FECACA}.btn-d:hover{background:#FEE2E2}
.btn-sm{padding:5px 10px;font-size:11px}

/* Table */
.tw{overflow-x:auto}
table{width:100%;border-collapse:collapse}
thead th{font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.07em;padding:9px 14px;text-align:left;background:#FAFBFC;border-bottom:1px solid var(--bd);white-space:nowrap}
tbody tr{border-bottom:1px solid var(--bd);transition:background .1s}
tbody tr:last-child{border-bottom:none}
tbody tr:hover{background:#F8FAFF}
tbody td{padding:11px 14px;font-size:12.5px;color:var(--t1);vertical-align:middle}
.td2{color:var(--t2);font-size:12px}
.tdb{font-weight:600}
.ra{display:flex;gap:4px;opacity:0;transition:opacity .12s}
tbody tr:hover .ra{opacity:1}

/* Badges */
.bdg{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:20px;font-size:10.5px;font-weight:600;white-space:nowrap}
.bdot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
.bdg-g{background:var(--gl);color:var(--gd)}.bdg-g .bdot{background:var(--gd)}
.bdg-r{background:var(--rl);color:var(--rd)}.bdg-r .bdot{background:var(--rd)}
.bdg-y{background:var(--wl);color:var(--wd)}.bdg-y .bdot{background:var(--wd)}
.bdg-b{background:var(--pl);color:var(--p)}.bdg-b .bdot{background:var(--p)}

/* Progress */
.pw{background:var(--bd);border-radius:20px;overflow:hidden}
.pf{height:100%;border-radius:20px;transition:width .4s}
.pb{background:var(--p)}.pg{background:var(--g)}.py{background:var(--w)}.pr{background:var(--r)}

/* Forms */
.fg{display:flex;flex-direction:column;gap:5px}
.fl{font-size:11px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.04em}
.fi{padding:8px 11px;border-radius:var(--r3);border:1.5px solid var(--bd);background:var(--wh);font-family:inherit;font-size:12.5px;color:var(--t1);outline:none;transition:border-color .14s}
.fi:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(37,99,235,.08)}
.fi::placeholder{color:var(--t3)}
.fi:disabled{background:var(--bg);color:var(--t3)}
.ta{width:100%;min-height:80px;resize:vertical;padding:8px 11px;border-radius:var(--r3);border:1.5px solid var(--bd);font-family:inherit;font-size:12.5px;color:var(--t1);outline:none;transition:border-color .14s}
.ta:focus{border-color:var(--p)}
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:13px}
.fall{grid-column:1/-1}
.fsec{padding:14px;background:var(--bg);border-radius:var(--r2);border:1px solid var(--bd);margin-bottom:18px}
.fsec-t{font-size:12px;font-weight:700;color:var(--p);margin-bottom:13px;display:flex;align-items:center;gap:6px}

/* Pills / filters */
.pills{display:flex;gap:5px;flex-wrap:wrap}
.pill{padding:5px 13px;border-radius:20px;font-size:11.5px;font-weight:600;cursor:pointer;border:1.5px solid var(--bd);background:var(--wh);color:var(--t2);transition:all .14s;font-family:inherit}
.pill:hover{border-color:var(--p);color:var(--p)}
.pill.on{background:var(--p);color:#fff;border-color:var(--p)}
.tabs-bar{display:flex;gap:3px;background:var(--bg);padding:3px;border-radius:var(--r2);width:fit-content;margin-bottom:16px}
.tab-btn{padding:6px 14px;border-radius:var(--r3);font-size:12px;font-weight:500;cursor:pointer;transition:all .14s;color:var(--t2);font-family:inherit;border:none;background:none}
.tab-btn.on{background:#fff;color:var(--p);font-weight:700;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.toolbar{display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.sbox{display:flex;align-items:center;gap:7px;background:var(--wh);border:1.5px solid var(--bd);border-radius:var(--r2);padding:7px 11px;min-width:200px;transition:border-color .14s}
.sbox:focus-within{border-color:var(--p)}
.sbox input{background:none;border:none;outline:none;font-family:inherit;font-size:12.5px;color:var(--t1);width:100%}
.sbox input::placeholder{color:var(--t3)}
.fsel{padding:7px 10px;border-radius:var(--r3);border:1.5px solid var(--bd);background:var(--wh);font-family:inherit;font-size:12px;color:var(--t1);outline:none;cursor:pointer}
.fsel:focus{border-color:var(--p)}

/* Misc */
.av{border-radius:50%;background:linear-gradient(135deg,#2563EB,#7C3AED);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;flex-shrink:0}
.bc{display:flex;align-items:center;gap:6px;margin-bottom:16px;font-size:12px}
.bc-back{display:flex;align-items:center;gap:4px;color:var(--p);font-weight:600;cursor:pointer}
.bc-back:hover{opacity:.75}
.bc-sep{color:var(--t4)}
.bc-cur{color:var(--t1);font-weight:600}
.ph{margin-bottom:18px}
.ph-t{font-size:19px;font-weight:800;color:var(--t1);letter-spacing:-.3px}
.ph-s{font-size:12.5px;color:var(--t3);margin-top:2px}
.mr{display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap}
.mc{flex:1;min-width:120px;background:var(--wh);border-radius:var(--r1);border:1px solid var(--bd);padding:12px 14px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.mv{font-size:20px;font-weight:800}
.ml{font-size:11px;color:var(--t3);margin-top:2px}
.tc{font-size:10px;font-weight:600;padding:2px 7px;border-radius:4px;background:var(--pl);color:var(--p)}
.vf{display:flex;flex-direction:column;gap:3px;padding:10px 12px;background:var(--bg);border-radius:var(--r3);border:1px solid var(--bd)}
.vfl{font-size:9.5px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em}
.vfv{font-size:13px;font-weight:600;color:var(--t1)}
.crit td{background:#FFF5F5!important}
.low td{background:#FFFBF0!important}
.uz{border:2px dashed var(--bd);border-radius:var(--r1);padding:32px 20px;text-align:center;cursor:pointer;transition:all .2s;background:var(--bg)}
.uz:hover{border-color:var(--p);background:var(--pl)}
.tog{width:38px;height:21px;border-radius:20px;position:relative;cursor:pointer;transition:background .2s;flex-shrink:0}
.tok{width:15px;height:15px;border-radius:50%;background:#fff;position:absolute;top:3px;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,.25)}
.ecl{max-height:200px;overflow-y:auto;border:1.5px solid var(--bd);border-radius:var(--r3)}
.eci{display:flex;align-items:center;gap:9px;padding:8px 12px;cursor:pointer;transition:background .12s;font-size:12.5px;border-bottom:1px solid var(--bd)}
.eci:last-child{border-bottom:none}
.eci:hover{background:var(--bg)}
.ecb{width:16px;height:16px;border-radius:4px;border:2px solid var(--bd);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .14s}
.ecb.on{background:var(--p);border-color:var(--p)}
.toast-wrap{position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:7px;pointer-events:none}
.toast{background:var(--t1);color:#fff;padding:11px 16px;border-radius:var(--r2);font-size:12.5px;font-weight:500;box-shadow:0 10px 30px rgba(0,0,0,.12);display:flex;align-items:center;gap:8px;animation:slideUp .28s ease}
.toast.ok{background:#065F46}.toast.err{background:#991B1B}
@keyframes slideUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
@keyframes popIn{from{transform:scale(.94) translateY(10px);opacity:0}to{transform:scale(1);opacity:1}}
.ov-bg{position:fixed;inset:0;background:rgba(15,23,42,.4);z-index:100;display:flex;justify-content:flex-end;animation:fadeIn .18s ease}
.panel{height:100%;background:var(--wh);box-shadow:0 10px 30px rgba(0,0,0,.12);overflow-y:auto;animation:slideIn .22s ease;display:flex;flex-direction:column}
.panel-md{width:460px}.panel-lg{width:680px}
.panel::-webkit-scrollbar{width:3px}.panel::-webkit-scrollbar-thumb{background:var(--t4)}
.phdr{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid var(--bd);position:sticky;top:0;background:var(--wh);z-index:1;flex-shrink:0}
.phdr-t{font-size:15px;font-weight:700}
.phdr-s{font-size:11.5px;color:var(--t3);margin-top:2px}
.pbody{padding:20px;flex:1;overflow-y:auto}
.pbody::-webkit-scrollbar{width:3px}
.pfoot{padding:14px 20px;border-top:1px solid var(--bd);display:flex;gap:8px;justify-content:flex-end;flex-shrink:0}
.modal-bg{position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .18s ease}
.modal{background:var(--wh);border-radius:var(--r1);width:100%;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 20px 50px rgba(0,0,0,.14);animation:popIn .2s cubic-bezier(.34,1.56,.64,1)}
.modal-sm{max-width:420px}.modal-md{max-width:620px}.modal-lg{max-width:800px}
.mhdr{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid var(--bd);flex-shrink:0}
.mhdr-t{font-size:15px;font-weight:700}
.mbody{overflow-y:auto;flex:1;padding:22px}
.mbody::-webkit-scrollbar{width:3px}
.mfoot{padding:14px 22px;border-top:1px solid var(--bd);display:flex;gap:8px;justify-content:flex-end;background:#FAFBFC;border-radius:0 0 var(--r1) var(--r1);flex-shrink:0}
.xbtn{width:30px;height:30px;border-radius:var(--r3);border:1.5px solid var(--bd);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--t2);transition:all .14s}
.xbtn:hover{background:var(--rl);color:var(--rd);border-color:#FECACA}
.ir{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--bd)}
.ir:last-child{border-bottom:none}
.ik{font-size:12px;color:var(--t3)}
.iv{font-size:12.5px;font-weight:600;color:var(--t1);text-align:right}
.sec-tag{font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px}
.edc-hdr{background:linear-gradient(135deg,#2563EB,#4F46E5);padding:22px 20px;color:#fff;border-radius:var(--r1) var(--r1) 0 0}
.ni{padding:13px 18px;border-bottom:1px solid var(--bd);display:flex;gap:11px;cursor:pointer;transition:background .12s}
.ni:hover{background:var(--bg)}
.ni.unread{background:#FAFCFF;border-left:3px solid var(--p)}
.perm-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--bd)}
.perm-row:last-child{border-bottom:none}
`;

/* ─── SVG Icons ─────────────────────────────────────────────────── */
function Ic({ n, s = 16, c = "currentColor" }) {
  const p = {
    dashboard:<><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    school:<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    teacher:<><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0113 0"/><line x1="18" y1="9" x2="22" y2="9"/><line x1="22" y1="7" x2="22" y2="11"/></>,
    student:<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    exam:<><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></>,
    book:<><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></>,
    fees:<><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
    center:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    notif:<><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    report:<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    search:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    plus:<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    upload:<><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></>,
    edit:<><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    trash:<><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>,
    eye:<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    download:<><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    check:<><polyline points="20 6 9 17 4 12"/></>,
    x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    send:<><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    users:<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    chevL:<><polyline points="15 18 9 12 15 6"/></>,
    chevR:<><polyline points="9 18 15 12 9 6"/></>,
    trend:<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    info:<><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    mail:<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    phone:<><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></>,
    file:<><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></>,
    lock:<><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
    shield:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    refresh:<><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></>,
    sms:<><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    calendar:<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    map:<><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/></>,
    briefcase:<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></>,
    person:<><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0112 0v2"/></>,
    role:<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/></>,
    template:<><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></>,
    pref:<><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/><circle cx="2" cy="6" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="9" cy="18" r="1"/></>,
    camera:<><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></>,
    tag:<><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {p[n] || null}
    </svg>
  );
}

/* ─── Shared Atoms ──────────────────────────────────────────────── */
function Bdg({ type, label }) {
  const m = { green:"bdg-g", red:"bdg-r", yellow:"bdg-y", blue:"bdg-b" };
  return <span className={`bdg ${m[type]||"bdg-b"}`}><span className="bdot"/>{label}</span>;
}
function SBox({ value, onChange, placeholder="Search…", style }) {
  return (
    <div className="sbox" style={style}>
      <Ic n="search" s={13} c="#94A3B8"/>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>
      {value && <span style={{cursor:"pointer",color:"#94A3B8",fontSize:10,flexShrink:0}} onClick={()=>onChange("")}>✕</span>}
    </div>
  );
}
function BC({ items, onBack }) {
  return (
    <div className="bc">
      <span className="bc-back" onClick={onBack}><Ic n="chevL" s={13}/>Back</span>
      {items.map((it,i) => (
        <span key={i} style={{display:"flex",alignItems:"center",gap:5}}>
          <span className="bc-sep">›</span>
          <span className={i===items.length-1?"bc-cur":""}>{it}</span>
        </span>
      ))}
    </div>
  );
}
function Confirm({ title, msg, onOk, onCancel, danger=true }) {
  return (
    <div className="modal-bg" onClick={onCancel}>
      <div className="modal modal-sm" onClick={e=>e.stopPropagation()}>
        <div style={{textAlign:"center",padding:"28px 22px 18px"}}>
          <div style={{width:52,height:52,borderRadius:"50%",background:danger?"#FEF2F2":"#EFF6FF",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
            <Ic n={danger?"trash":"check"} s={22} c={danger?"#EF4444":"#2563EB"}/>
          </div>
          <div style={{fontSize:15,fontWeight:700,marginBottom:7}}>{title}</div>
          <div style={{fontSize:12.5,color:"var(--t2)",lineHeight:1.6}}>{msg}</div>
        </div>
        <div className="mfoot">
          <button className="btn btn-g" onClick={onCancel}>Cancel</button>
          <button className={`btn ${danger?"btn-d":"btn-p"}`} onClick={onOk}>{danger?"Delete":"Confirm"}</button>
        </div>
      </div>
    </div>
  );
}

/* Multi-select exam checkbox dropdown */
function ExamMulti({ selected=[], onChange, allExams }) {
  const [open,setOpen] = useState(false);
  return (
    <div style={{position:"relative"}}>
      <div className="fi" style={{cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",minHeight:36,gap:6}} onClick={()=>setOpen(o=>!o)}>
        <div style={{display:"flex",gap:4,flex:1,flexWrap:"wrap"}}>
          {selected.length===0
            ? <span style={{color:"var(--t3)"}}>Select exams…</span>
            : selected.map(e=><span key={e} className="tc" style={{fontSize:9.5}}>{e}</span>)}
        </div>
        <Ic n="chevR" s={11} c="var(--t3)"/>
      </div>
      {open && (
        <div style={{position:"absolute",top:"100%",left:0,right:0,zIndex:60,background:"var(--wh)",border:"1.5px solid var(--bd)",borderRadius:"var(--r3)",boxShadow:"0 10px 30px rgba(0,0,0,.12)",marginTop:4}}>
          <div className="ecl">
            {allExams.map(e => (
              <div key={e} className="eci" onClick={()=>{ const nx=selected.includes(e)?selected.filter(x=>x!==e):[...selected,e]; onChange(nx); }}>
                <div className={`ecb${selected.includes(e)?" on":""}`}>{selected.includes(e)&&<Ic n="check" s={9} c="#fff"/>}</div>
                <span>{e}</span>
              </div>
            ))}
          </div>
          <div style={{padding:"7px 10px",borderTop:"1px solid var(--bd)"}}>
            <button className="btn btn-g btn-sm" style={{width:"100%",justifyContent:"center"}} onClick={()=>setOpen(false)}>Done ({selected.length} selected)</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* "Manthan +2" compact exam display */
function ExamPills({ exams=[] }) {
  if (!exams || exams.length===0) return <span style={{color:"var(--t3)",fontSize:11}}>—</span>;
  return (
    <div style={{display:"flex",alignItems:"center",gap:4}}>
      <span className="tc">{exams[0]}</span>
      {exams.length > 1 && (
        <span style={{fontSize:10,fontWeight:700,color:"var(--p)",background:"var(--pm)",padding:"2px 5px",borderRadius:4}}>+{exams.length-1}</span>
      )}
    </div>
  );
}

function UploadExcel({ title, columns, onBack, onSuccess }) {
  const [step,setStep] = useState(1);
  return (
    <>
      <BC items={[title]} onBack={onBack}/>
      <div className="card cp" style={{maxWidth:560}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:18}}>{title}</div>
        {step===1 ? (
          <>
            <div className="uz" onClick={()=>setStep(2)}>
              <div style={{fontSize:32,marginBottom:10}}>📊</div>
              <div style={{fontWeight:700,fontSize:13.5,marginBottom:4}}>Drag & drop Excel / CSV file</div>
              <div style={{fontSize:12,color:"var(--t3)",marginBottom:14}}>Supports .xlsx .xls .csv — max 10 MB</div>
              <button className="btn btn-p" style={{margin:"0 auto"}} onClick={e=>{e.stopPropagation();setStep(2);}}><Ic n="upload" s={13} c="#fff"/> Choose File</button>
            </div>
            <div style={{marginTop:14,padding:"11px 13px",background:"var(--bg)",borderRadius:"var(--r2)",border:"1px solid var(--bd)"}}>
              <div style={{fontWeight:600,fontSize:12,marginBottom:7,display:"flex",gap:5,alignItems:"center"}}><Ic n="file" s={13} c="var(--p)"/> Required Columns</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{columns.map(c=><span key={c} className="tc">{c}</span>)}</div>
              <button className="btn btn-g btn-sm" style={{marginTop:8}}><Ic n="download" s={11}/> Template</button>
            </div>
          </>
        ) : (
          <>
            <div style={{display:"flex",alignItems:"center",gap:9,padding:"10px 13px",background:"var(--gl)",borderRadius:"var(--r3)",marginBottom:14}}>
              <Ic n="check" s={14} c="var(--gd)"/><span style={{fontWeight:600,color:"var(--gd)",fontSize:12.5}}>File ready: import_data.xlsx</span>
            </div>
            <div style={{background:"var(--bg)",borderRadius:"var(--r2)",border:"1px solid var(--bd)",overflow:"hidden",marginBottom:14}}>
              <div style={{display:"flex",gap:5,padding:"7px 12px",background:"var(--bd)"}}>
                {columns.map(c=><span key={c} style={{flex:1,fontSize:9.5,fontWeight:700,color:"var(--t2)",textTransform:"uppercase"}}>{c}</span>)}
              </div>
              {[0,1].map(i=>(
                <div key={i} style={{display:"flex",gap:5,padding:"7px 12px",borderTop:"1px solid var(--bd)"}}>
                  {columns.map((_,j)=><span key={j} style={{flex:1,fontSize:11,color:"var(--t2)"}}>Sample {j+1}</span>)}
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-p" onClick={onSuccess}><Ic n="check" s={13} c="#fff"/> Import Now</button>
              <button className="btn btn-g" onClick={()=>setStep(1)}>Re-upload</button>
              <button className="btn btn-g" onClick={onBack}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ─── Data ──────────────────────────────────────────────────────── */
const EXAM_CATS = ["Manthan","Shabbas","ICS","Prabhav","Nishtha","Bodh","Gyan","Pragya","Ankur","Sparsh"];
const EXAM_TYPES = ["Olympiad","Aptitude","Scholarship","Proficiency","Assessment","Quiz","Regional","State Level"];

const INIT_SCHOOLS = [
  {id:1,name:"Ryan International School",location:"Mumbai",district:"Thane",address:"Plot 12, Chembur East",pincode:"400071",teachers:34,status:"active",exams:["Manthan","ICS","Shabbas"],phone:"022-12345678",email:"admin@ryan.edu",principal:"Dr. Anita Roy",assignedTeacherIds:[1,3]},
  {id:2,name:"Podar International",location:"Pune",district:"Pune",address:"Mundhwa, Camp Road",pincode:"411036",teachers:28,status:"active",exams:["Shabbas","Manthan"],phone:"020-98765432",email:"admin@podar.edu",principal:"Mr. Suresh Nair",assignedTeacherIds:[2]},
  {id:3,name:"Delhi Public School",location:"Delhi",district:"South Delhi",address:"RK Puram, Sector 12",pincode:"110022",teachers:26,status:"active",exams:["ICS"],phone:"011-55443322",email:"admin@dps.edu",principal:"Mrs. Kavita Mehta",assignedTeacherIds:[3]},
  {id:4,name:"St. Mary's Convent",location:"Nagpur",district:"Nagpur",address:"Civil Lines, Main Road",pincode:"440001",teachers:22,status:"active",exams:["Manthan","Shabbas","Prabhav"],phone:"0712-33221100",email:"admin@stmarys.edu",principal:"Sr. Theresa",assignedTeacherIds:[4,5]},
  {id:5,name:"Kendriya Vidyalaya",location:"Nashik",district:"Nashik",address:"College Road, Sector 4",pincode:"422005",teachers:20,status:"active",exams:["Shabbas","Bodh"],phone:"0253-77665544",email:"admin@kv.edu",principal:"Mr. Rajesh Patil",assignedTeacherIds:[5]},
  {id:6,name:"Vidya Valley School",location:"Pune",district:"Pimpri",address:"Wakad, Phase 1",pincode:"411057",teachers:18,status:"inactive",exams:["ICS","Manthan","Nishtha"],phone:"020-44332211",email:"admin@vidyavalley.edu",principal:"Mrs. Smita Joshi",assignedTeacherIds:[7]},
  {id:7,name:"Billabong High",location:"Mumbai",district:"Andheri",address:"Andheri West, Link Road",pincode:"400058",teachers:16,status:"active",exams:["Manthan","Gyan"],phone:"022-99887766",email:"admin@billabong.edu",principal:"Dr. Anil Sharma",assignedTeacherIds:[6]},
];
const INIT_STUDENTS = [
  {id:1,name:"Aarav Shah",class:"9",div:"A",schoolId:1,roll:"RI-901",status:"active",phone:"+91 9876543210",altPhone:"+91 9876543211",email:"aarav@gmail.com",dob:"2009-05-12",gender:"Male",address:"Chembur, Mumbai",pincode:"400071",exams:["Manthan","ICS","Shabbas"],examScores:[{exam:"Manthan 2024",score:87,total:100},{exam:"ICS 2024",score:92,total:100}]},
  {id:2,name:"Diya Mehta",class:"8",div:"B",schoolId:2,roll:"PI-802",status:"active",phone:"+91 9765432109",altPhone:"",email:"diya@gmail.com",dob:"2010-08-22",gender:"Female",address:"Mundhwa, Pune",pincode:"411036",exams:["Shabbas"],examScores:[{exam:"Shabbas 2024",score:78,total:100}]},
  {id:3,name:"Rohan Kulkarni",class:"10",div:"A",schoolId:3,roll:"DP-1001",status:"active",phone:"+91 9654321098",altPhone:"",email:"rohan@gmail.com",dob:"2008-03-17",gender:"Male",address:"RK Puram, Delhi",pincode:"110022",exams:["ICS","Prabhav"],examScores:[{exam:"ICS 2024",score:81,total:100}]},
  {id:4,name:"Ananya Iyer",class:"7",div:"C",schoolId:1,roll:"RI-703",status:"active",phone:"+91 9543210987",altPhone:"",email:"ananya@gmail.com",dob:"2011-11-05",gender:"Female",address:"Chembur, Mumbai",pincode:"400071",exams:["Manthan","Shabbas","ICS"],examScores:[{exam:"Manthan 2024",score:95,total:100}]},
  {id:5,name:"Kabir Singh",class:"9",div:"B",schoolId:5,roll:"KV-902",status:"inactive",phone:"+91 9432109876",altPhone:"",email:"kabir@gmail.com",dob:"2009-07-30",gender:"Male",address:"Nashik",pincode:"422005",exams:["Shabbas"],examScores:[]},
  {id:6,name:"Ishaan Verma",class:"10",div:"A",schoolId:1,roll:"RI-1003",status:"active",phone:"+91 9321098765",altPhone:"+91 9321098766",email:"ishaan@gmail.com",dob:"2008-01-14",gender:"Male",address:"Chembur, Mumbai",pincode:"400071",exams:["Manthan","ICS"],examScores:[{exam:"ICS 2024",score:88,total:100},{exam:"Manthan 2024",score:72,total:100}]},
  {id:7,name:"Saanvi Reddy",class:"8",div:"A",schoolId:7,roll:"BH-801",status:"active",phone:"+91 9210987654",altPhone:"",email:"saanvi@gmail.com",dob:"2010-06-28",gender:"Female",address:"Andheri, Mumbai",pincode:"400058",exams:["Manthan"],examScores:[{exam:"Manthan 2024",score:83,total:100}]},
  {id:8,name:"Arjun Nair",class:"9",div:"C",schoolId:6,roll:"VV-903",status:"active",phone:"+91 9109876543",altPhone:"",email:"arjun@gmail.com",dob:"2009-09-10",gender:"Male",address:"Wakad, Pune",pincode:"411057",exams:["ICS","Manthan"],examScores:[{exam:"ICS 2024",score:67,total:100}]},
  {id:9,name:"Meera Sharma",class:"7",div:"A",schoolId:2,roll:"PI-701",status:"active",phone:"+91 9008765432",altPhone:"",email:"meera@gmail.com",dob:"2011-04-03",gender:"Female",address:"Mundhwa, Pune",pincode:"411036",exams:["Shabbas","Bodh"],examScores:[{exam:"Shabbas 2024",score:90,total:100}]},
  {id:10,name:"Laksh Patel",class:"10",div:"B",schoolId:4,roll:"SM-1002",status:"active",phone:"+91 8987654321",altPhone:"",email:"laksh@gmail.com",dob:"2008-12-19",gender:"Male",address:"Civil Lines, Nagpur",pincode:"440001",exams:["Manthan","Shabbas","Prabhav"],examScores:[{exam:"Manthan 2024",score:76,total:100}]},
];
const INIT_TEACHERS = [
  {id:1,name:"Priya Sharma",initials:"PS",mobile:"+91 98765 43210",examNames:["Manthan","ICS"],school:"Ryan International School",schoolId:1,status:"active",email:"priya.s@ryan.edu",studentCount:92,booksPurchased:50,experience:"8 Years",joined:"Jan 2019",address:"Mumbai, Maharashtra",altPhone:"",dob:"1988-03-14",gender:"Female",pincode:"400071"},
  {id:2,name:"Rahul Desai",initials:"RD",mobile:"+91 97654 32109",examNames:["Shabbas"],school:"Podar International",schoolId:2,status:"active",email:"rahul.d@podar.edu",studentCount:64,booksPurchased:45,experience:"5 Years",joined:"Mar 2021",address:"Pune, Maharashtra",altPhone:"",dob:"1990-07-22",gender:"Male",pincode:"411036"},
  {id:3,name:"Sunita Patil",initials:"SP",mobile:"+91 96543 21098",examNames:["Manthan","Shabbas"],school:"Delhi Public School",schoolId:3,status:"active",email:"sunita.p@dps.edu",studentCount:78,booksPurchased:60,experience:"11 Years",joined:"Jul 2017",address:"Delhi",altPhone:"",dob:"1984-11-05",gender:"Female",pincode:"110022"},
  {id:4,name:"Arun Kumar",initials:"AK",mobile:"+91 95432 10987",examNames:["ICS"],school:"St. Mary's Convent",schoolId:4,status:"inactive",email:"arun.k@stmarys.edu",studentCount:44,booksPurchased:40,experience:"4 Years",joined:"Sep 2022",address:"Nagpur, Maharashtra",altPhone:"",dob:"1992-05-30",gender:"Male",pincode:"440001"},
  {id:5,name:"Meena Joshi",initials:"MJ",mobile:"+91 94321 09876",examNames:["Shabbas","Manthan","ICS"],school:"Kendriya Vidyalaya",schoolId:5,status:"active",email:"meena.j@kv.edu",studentCount:112,booksPurchased:55,experience:"13 Years",joined:"Jun 2015",address:"Nashik, Maharashtra",altPhone:"",dob:"1982-09-18",gender:"Female",pincode:"422005"},
  {id:6,name:"Vijay Nair",initials:"VN",mobile:"+91 93210 98765",examNames:["Manthan"],school:"Billabong High",schoolId:7,status:"active",email:"vijay.n@billabong.edu",studentCount:56,booksPurchased:35,experience:"6 Years",joined:"Feb 2020",address:"Mumbai, Maharashtra",altPhone:"",dob:"1989-01-14",gender:"Male",pincode:"400058"},
  {id:7,name:"Kavita Rao",initials:"KR",mobile:"+91 92109 87654",examNames:["ICS","Shabbas"],school:"Vidya Valley School",schoolId:6,status:"active",email:"kavita.r@vidyavalley.edu",studentCount:68,booksPurchased:48,experience:"9 Years",joined:"Apr 2018",address:"Pune, Maharashtra",altPhone:"",dob:"1986-06-25",gender:"Female",pincode:"411057"},
];
const INIT_EXAMS = [
  {id:1,name:"State Level Olympiad 2025",type:"Olympiad",date:"2025-06-15",teacher:"Priya Sharma",students:480,status:"upcoming",exam:"ICS",center:"Mumbai Central Hall",duration:120,maxStudents:500,description:"Annual state-level olympiad for Class 8–10 students."},
  {id:2,name:"Science Aptitude Test",type:"Aptitude",date:"2025-06-10",teacher:"Rahul Desai",students:320,status:"active",exam:"Shabbas",center:"Pune Exam Center A",duration:90,maxStudents:350,description:"Science aptitude evaluation for all classes."},
  {id:3,name:"Mathematics Olympiad Q1",type:"Olympiad",date:"2025-05-28",teacher:"Meena Joshi",students:560,status:"active",exam:"Manthan",center:"Nagpur Convention Hall",duration:120,maxStudents:600,description:"Q1 maths olympiad covering algebra and geometry."},
  {id:4,name:"English Proficiency Test",type:"Proficiency",date:"2025-05-20",teacher:"Sunita Patil",students:280,status:"completed",exam:"Manthan",center:"Delhi North Center",duration:60,maxStudents:300,description:"English language proficiency assessment."},
  {id:5,name:"Annual Scholarship Exam",type:"Scholarship",date:"2025-05-01",teacher:"Vijay Nair",students:640,status:"completed",exam:"Shabbas",center:"Nashik Exam Block",duration:180,maxStudents:700,description:"Annual scholarship exam for meritorious students."},
  {id:6,name:"ICS Regional Finals",type:"Olympiad",date:"2025-04-12",teacher:"Kavita Rao",students:390,status:"completed",exam:"ICS",center:"Thane Study Center",duration:150,maxStudents:400,description:"ICS regional-level finals competition."},
];
const INIT_CENTERS = [
  {id:1,name:"Mumbai Central Hall",city:"Mumbai",state:"Maharashtra",address:"Dadar West, Mumbai 400028",capacity:500,assigned:498,contact:"022-24567890",incharge:"Mr. Suresh Patil"},
  {id:2,name:"Pune Exam Center A",city:"Pune",state:"Maharashtra",address:"Shivajinagar, Pune 411005",capacity:400,assigned:320,contact:"020-25678901",incharge:"Mrs. Rekha Desai"},
  {id:3,name:"Nagpur Convention Hall",city:"Nagpur",state:"Maharashtra",address:"Civil Lines, Nagpur 440001",capacity:350,assigned:290,contact:"0712-2456789",incharge:"Mr. Anil Bhosale"},
  {id:4,name:"Delhi North Center",city:"Delhi",state:"Delhi",address:"Rohini Sector 3, Delhi 110085",capacity:600,assigned:598,contact:"011-27892345",incharge:"Mr. Deepak Sharma"},
  {id:5,name:"Nashik Exam Block",city:"Nashik",state:"Maharashtra",address:"College Road, Nashik 422005",capacity:250,assigned:180,contact:"0253-2304567",incharge:"Mrs. Priya Kulkarni"},
  {id:6,name:"Thane Study Center",city:"Thane",state:"Maharashtra",address:"Thane West, Thane 400601",capacity:300,assigned:300,contact:"022-25456789",incharge:"Mr. Vijay More"},
];
const INIT_FEES = [
  {id:1,teacher:"Priya Sharma",school:"Ryan International School",total:12000,paid:12000,pending:0,status:"paid"},
  {id:2,teacher:"Rahul Desai",school:"Podar International",total:10000,paid:7500,pending:2500,status:"partial"},
  {id:3,teacher:"Sunita Patil",school:"Delhi Public School",total:11000,paid:0,pending:11000,status:"pending"},
  {id:4,teacher:"Arun Kumar",school:"St. Mary's Convent",total:9500,paid:9500,pending:0,status:"paid"},
  {id:5,teacher:"Meena Joshi",school:"Kendriya Vidyalaya",total:13000,paid:8000,pending:5000,status:"partial"},
  {id:6,teacher:"Vijay Nair",school:"Billabong High",total:10500,paid:10500,pending:0,status:"paid"},
  {id:7,teacher:"Kavita Rao",school:"Vidya Valley School",total:9000,paid:0,pending:9000,status:"pending"},
];
const NAV = [
  {id:"dashboard",icon:"dashboard",label:"Dashboard"},
  {id:"schools",icon:"school",label:"Schools",badge:"7"},
  {id:"teachers",icon:"teacher",label:"Teachers"},
  {id:"students",icon:"student",label:"Students",badge:"10",blue:true},
  {id:"exams",icon:"exam",label:"Exams"},
  {id:"books",icon:"book",label:"Books"},
  {id:"fees",icon:"fees",label:"Fees"},
  {id:"centers",icon:"center",label:"Centers"},
  {id:"notifications",icon:"notif",label:"Notifications",badge:"5"},
  {id:"reports",icon:"report",label:"Reports"},
  {id:"settings",icon:"settings",label:"Settings"},
];
const TITLES = {dashboard:"Dashboard",schools:"Schools",teachers:"Teachers",students:"Students",exams:"Exams",books:"Books",fees:"Fees",centers:"Centers",notifications:"Notifications",reports:"Reports",settings:"Settings"};

/* ─── App Root ──────────────────────────────────────────────────── */
export default function App() {
  const [page,setPage] = useState("dashboard");
  const [overlay,setOverlay] = useState(null);
  const [toasts,setToasts] = useState([]);
  const [schools,setSchools] = useState(INIT_SCHOOLS);
  const [students,setStudents] = useState(INIT_STUDENTS);
  const [teachers,setTeachers] = useState(INIT_TEACHERS);
  const [exams,setExams] = useState(INIT_EXAMS);
  const [centers,setCenters] = useState(INIT_CENTERS);
  const [fees] = useState(INIT_FEES);
  const [books,setBooks] = useState(INIT_TEACHERS.map(t=>({id:t.id,teacher:t.name,school:t.school,schoolId:t.schoolId,purchased:t.booksPurchased,students:t.studentCount,status:t.booksPurchased<40?"critical":t.booksPurchased<48?"low":"ok"})));

  const scCounts = useMemo(()=>{ const c={}; students.forEach(s=>{c[s.schoolId]=(c[s.schoolId]||0)+1;}); return c; },[students]);
  const schoolsWC = schools.map(s=>({...s,students:scCounts[s.id]||0}));

  const toast = useCallback((msg,type="ok")=>{
    const id=Date.now();
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3000);
  },[]);

  const goTo = useCallback((pg)=>{ setPage(pg); setOverlay(null); },[]);
  const sp = { schools:schoolsWC, setSchools, students, setStudents, teachers, setTeachers, exams, setExams, centers, setCenters, fees, books, setBooks, toast, goTo };

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sb-logo">
            <div className="sb-logo-ic"><Ic n="exam" s={17} c="#fff"/></div>
            <div><div className="sb-logo-name">ExamPro</div><div className="sb-logo-sub">Super Admin Panel</div></div>
          </div>
          <div className="sb-sec">
            <div className="sb-lbl">Main Menu</div>
            {NAV.slice(0,5).map(n=>(
              <div key={n.id} className={`nv${page===n.id?" on":""}`} onClick={()=>goTo(n.id)}>
                <Ic n={n.icon} s={15}/>{n.label}
                {n.badge&&<span className={`nbadge${n.blue?" bl":""}`}>{n.badge}</span>}
              </div>
            ))}
          </div>
          <div className="sb-sec">
            <div className="sb-lbl">Management</div>
            {NAV.slice(5,9).map(n=>(
              <div key={n.id} className={`nv${page===n.id?" on":""}`} onClick={()=>goTo(n.id)}>
                <Ic n={n.icon} s={15}/>{n.label}
                {n.badge&&<span className="nbadge">{n.badge}</span>}
              </div>
            ))}
          </div>
          <div className="sb-sec">
            <div className="sb-lbl">Analytics</div>
            {NAV.slice(9).map(n=>(
              <div key={n.id} className={`nv${page===n.id?" on":""}`} onClick={()=>goTo(n.id)}>
                <Ic n={n.icon} s={15}/>{n.label}
              </div>
            ))}
          </div>
          <div className="sb-footer">
            <div className="sb-user" onClick={()=>setOverlay("profile")}>
              <div className="av" style={{width:32,height:32,fontSize:11}}>SA</div>
              <div><div style={{fontSize:12.5,fontWeight:600,color:"var(--t1)"}}>Super Admin</div><div style={{fontSize:10.5,color:"var(--t3)"}}>admin@exampro.in</div></div>
            </div>
          </div>
        </aside>

        <div className="main">
          <header className="hdr">
            <div className="hdr-title">{TITLES[page]}</div>
            <div className="hsr"><Ic n="search" s={13} c="#94A3B8"/><input placeholder="Search students, schools, exams…"/></div>
            <div className="hacts">
              <div className={`hbtn${overlay==="notif"?" on":""}`} onClick={()=>setOverlay(overlay==="notif"?null:"notif")}>
                <Ic n="notif" s={15}/>{overlay!=="notif"&&<div className="hdot"/>}
              </div>
              <div className={`hbtn${overlay==="settings"?" on":""}`} onClick={()=>setOverlay(overlay==="settings"?null:"settings")}><Ic n="settings" s={15}/></div>
              <div className={`hav${overlay==="profile"?" on":""}`} onClick={()=>setOverlay(overlay==="profile"?null:"profile")}>SA</div>
            </div>
          </header>
          <div className="cnt">
            {page==="dashboard"     && <DashboardPage {...sp}/>}
            {page==="schools"       && <SchoolsPage {...sp}/>}
            {page==="teachers"      && <TeachersPage {...sp}/>}
            {page==="students"      && <StudentsPage {...sp}/>}
            {page==="exams"         && <ExamsPage {...sp}/>}
            {page==="books"         && <BooksPage {...sp}/>}
            {page==="fees"          && <FeesPage {...sp}/>}
            {page==="centers"       && <CentersPage {...sp}/>}
            {page==="notifications" && <NotificationsPage/>}
            {page==="reports"       && <ReportsPage {...sp}/>}
            {page==="settings"      && <SettingsPage/>}
          </div>
        </div>
      </div>

      {overlay==="notif"    && <NotifPanel    onClose={()=>setOverlay(null)} onViewAll={()=>goTo("notifications")}/>}
      {overlay==="settings" && <SettingsPanel onClose={()=>setOverlay(null)} onNav={goTo}/>}
      {overlay==="profile"  && <ProfilePanel  onClose={()=>setOverlay(null)} toast={toast}/>}

      <div className="toast-wrap">
        {toasts.map(t=>(
          <div key={t.id} className={`toast ${t.type}`}>
            <Ic n={t.type==="ok"?"check":"x"} s={13} c="#fff"/>{t.msg}
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Header Panels ─────────────────────────────────────────────── */
function NotifPanel({onClose,onViewAll}) {
  const items = [
    {icon:"exam",bg:"#EFF6FF",ic:"#2563EB",title:"New Exam Published",msg:"State Level Olympiad 2025 published.",time:"2 min ago",unread:true},
    {icon:"fees",bg:"#FEF2F2",ic:"#EF4444",title:"Pending Fee Alert",msg:"3 teachers have overdue payments.",time:"1 hour ago",unread:true},
    {icon:"book",bg:"#FFFBEB",ic:"#F59E0B",title:"Low Book Stock",msg:"Vijay Nair: only 35 books remaining.",time:"3 hours ago",unread:true},
    {icon:"student",bg:"#ECFDF5",ic:"#10B981",title:"New Students Enrolled",msg:"45 new students registered this week.",time:"Yesterday",unread:false},
    {icon:"center",bg:"#F5F3FF",ic:"#7C3AED",title:"Center Capacity Warning",msg:"Mumbai Hall at 99% capacity.",time:"2 days ago",unread:false},
  ];
  const [f,setF]=useState("All");
  const shown = f==="Unread" ? items.filter(n=>n.unread) : items;
  return (
    <div className="ov-bg" onClick={onClose}>
      <div className="panel panel-md" onClick={e=>e.stopPropagation()}>
        <div className="phdr">
          <div><div className="phdr-t">Notifications</div><div className="phdr-s">{items.filter(n=>n.unread).length} unread</div></div>
          <div style={{display:"flex",gap:7}}>
            <button className="btn btn-g btn-sm">Mark all read</button>
            <button className="xbtn" onClick={onClose}><Ic n="x" s={13}/></button>
          </div>
        </div>
        <div style={{padding:"10px 18px",borderBottom:"1px solid var(--bd)",display:"flex",gap:5}}>
          {["All","Unread"].map(x=><button key={x} className={`pill${f===x?" on":""}`} onClick={()=>setF(x)}>{x}</button>)}
        </div>
        <div style={{flex:1,overflowY:"auto"}}>
          {shown.map((n,i)=>(
            <div key={i} className={`ni${n.unread?" unread":""}`}>
              <div style={{width:34,height:34,background:n.bg,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Ic n={n.icon} s={16} c={n.ic}/>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:6}}>
                  <div style={{fontWeight:600,fontSize:12.5}}>{n.title}</div>
                  {n.unread&&<div style={{width:6,height:6,background:"var(--p)",borderRadius:"50%",flexShrink:0,marginTop:4}}/>}
                </div>
                <div style={{fontSize:12,color:"var(--t2)",marginTop:2,lineHeight:1.4}}>{n.msg}</div>
                <div style={{fontSize:10.5,color:"var(--t3)",marginTop:4}}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="pfoot">
          <button className="btn btn-o" style={{width:"100%",justifyContent:"center"}} onClick={onViewAll}>View All Notifications</button>
        </div>
      </div>
    </div>
  );
}
function SettingsPanel({onClose,onNav}) {
  const [tab,setTab]=useState("roles");
  const [prefs,setPrefs]=useState({email:true,sms:true,report:false,dark:false,tfa:true});
  const roles=[{name:"Super Admin",users:1,perms:["Full Access"]},{name:"Exam Manager",users:3,perms:["Exams","Centers","Reports"]},{name:"School Coordinator",users:8,perms:["Schools","Teachers","Students"]},{name:"Finance Officer",users:2,perms:["Fees","Reports"]}];
  return (
    <div className="ov-bg" onClick={onClose}>
      <div className="panel panel-lg" onClick={e=>e.stopPropagation()}>
        <div className="phdr">
          <div><div className="phdr-t">Settings</div><div className="phdr-s">Roles · Templates · Preferences</div></div>
          <div style={{display:"flex",gap:7}}>
            <button className="btn btn-p btn-sm" onClick={()=>{onNav("settings");}}>Full Settings</button>
            <button className="xbtn" onClick={onClose}><Ic n="x" s={13}/></button>
          </div>
        </div>
        <div style={{padding:"10px 18px",borderBottom:"1px solid var(--bd)"}}>
          <div className="tabs-bar" style={{marginBottom:0}}>
            {[{id:"roles",ic:"role",l:"Roles"},{id:"templates",ic:"template",l:"Templates"},{id:"prefs",ic:"pref",l:"Preferences"}].map(t=>(
              <button key={t.id} className={`tab-btn${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)} style={{display:"flex",alignItems:"center",gap:5}}>
                <Ic n={t.ic} s={12}/>{t.l}
              </button>
            ))}
          </div>
        </div>
        <div className="pbody">
          {tab==="roles"&&(
            <>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div style={{fontWeight:700,fontSize:13.5}}>Role Management</div>
                <button className="btn btn-p btn-sm"><Ic n="plus" s={12} c="#fff"/> Add Role</button>
              </div>
              {roles.map((r,i)=>(
                <div key={i} style={{background:"var(--bg)",border:"1px solid var(--bd)",borderRadius:"var(--r2)",padding:"13px 14px",marginBottom:9}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:9}}>
                      <div style={{width:34,height:34,background:"var(--pl)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="shield" s={16} c="var(--p)"/></div>
                      <div><div style={{fontWeight:700,fontSize:13}}>{r.name}</div><div style={{fontSize:11,color:"var(--t3)"}}>{r.users} user{r.users!==1?"s":""}</div></div>
                    </div>
                    <button className="btn btn-g btn-sm"><Ic n="edit" s={11}/> Edit</button>
                  </div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{r.perms.map(p=><span key={p} className="tc" style={{fontSize:9.5}}>{p}</span>)}</div>
                </div>
              ))}
            </>
          )}
          {tab==="templates"&&(
            <div className="g2">
              {[{n:"Olympiad Template",t:"Olympiad",d:"120 min",q:80},{n:"Scholarship Template",t:"Scholarship",d:"180 min",q:100},{n:"Aptitude Template",t:"Aptitude",d:"90 min",q:60},{n:"Proficiency Template",t:"Proficiency",d:"60 min",q:50}].map((t,i)=>(
                <div key={i} style={{background:"var(--bg)",border:"1px solid var(--bd)",borderRadius:"var(--r2)",padding:"14px",cursor:"pointer"}}>
                  <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{t.n}</div>
                  <div style={{fontSize:11.5,color:"var(--t3)",marginBottom:8}}>{t.t} · {t.d} · {t.q} Qs</div>
                  <span className="tc" style={{fontSize:9.5}}>{t.t}</span>
                </div>
              ))}
            </div>
          )}
          {tab==="prefs"&&(
            <>
              <div style={{fontWeight:700,fontSize:13.5,marginBottom:14}}>System Preferences</div>
              {[["Email Notifications","email"],["SMS Notifications","sms"],["Auto Reports","report"],["Dark Mode","dark"],["Two-factor Auth","tfa"]].map(([l,k])=>(
                <div key={k} className="perm-row">
                  <div style={{fontSize:13,fontWeight:600}}>{l}</div>
                  <div className="tog" style={{background:prefs[k]?"var(--p)":"var(--bd)"}} onClick={()=>setPrefs(p=>({...p,[k]:!p[k]}))}>
                    <div className="tok" style={{left:prefs[k]?20:3}}/>
                  </div>
                </div>
              ))}
              <button className="btn btn-p" style={{marginTop:16}}><Ic n="check" s={13} c="#fff"/> Save</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
function ProfilePanel({onClose,toast}) {
  const [editing,setEditing]=useState(false);
  const [f,setF]=useState({name:"Rahul Mehta",email:"admin@exampro.in",phone:"+91 98765 00000",role:"Super Admin",org:"ExamPro Platform",city:"Mumbai"});
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  return (
    <div className="ov-bg" onClick={onClose}>
      <div className="panel panel-md" onClick={e=>e.stopPropagation()}>
        <div className="phdr">
          <div><div className="phdr-t">My Profile</div></div>
          <div style={{display:"flex",gap:7}}>
            <button className="btn btn-o btn-sm" onClick={()=>setEditing(!editing)}><Ic n="edit" s={12}/>{editing?"Cancel":"Edit"}</button>
            <button className="xbtn" onClick={onClose}><Ic n="x" s={13}/></button>
          </div>
        </div>
        <div className="pbody">
          <div style={{textAlign:"center",marginBottom:22}}>
            <div style={{position:"relative",display:"inline-block"}}>
              <div style={{width:68,height:68,borderRadius:"50%",background:"linear-gradient(135deg,#2563EB,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:800,color:"#fff",margin:"0 auto",boxShadow:"0 6px 18px rgba(37,99,235,.3)"}}>RA</div>
              <div style={{position:"absolute",bottom:0,right:0,width:22,height:22,background:"var(--p)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",border:"2px solid #fff"}}><Ic n="camera" s={10} c="#fff"/></div>
            </div>
            <div style={{fontWeight:800,fontSize:16,marginTop:10}}>{f.name}</div>
            <div style={{fontSize:12,color:"var(--t3)",marginTop:2}}>{f.role}</div>
            <div style={{display:"flex",gap:7,justifyContent:"center",marginTop:8}}><Bdg type="green" label="Active"/><span className="tc"><Ic n="shield" s={9}/> Verified</span></div>
          </div>
          {editing ? (
            <div style={{display:"flex",flexDirection:"column",gap:11}}>
              {[["Full Name","name","text"],["Email","email","email"],["Phone","phone","tel"],["City","city","text"],["Organisation","org","text"]].map(([lbl,key,type])=>(
                <div className="fg" key={key}><label className="fl">{lbl}</label><input className="fi" type={type} value={f[key]} onChange={e=>s(key,e.target.value)}/></div>
              ))}
              <div style={{display:"flex",gap:8,marginTop:4}}>
                <button className="btn btn-p" style={{flex:1}} onClick={()=>{setEditing(false);toast("Profile updated!");}}><Ic n="check" s={13} c="#fff"/> Save</button>
                <button className="btn btn-g" onClick={()=>setEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              {[["Full Name",f.name,"users"],["Email",f.email,"mail"],["Phone",f.phone,"phone"],["Location",f.city,"center"],["Organisation",f.org,"school"]].map(([k,v,ic])=>(
                <div key={k} className="ir">
                  <div style={{display:"flex",alignItems:"center",gap:7}}><Ic n={ic} s={13} c="var(--t3)"/><span className="ik">{k}</span></div>
                  <span className="iv">{v}</span>
                </div>
              ))}
              <div style={{marginTop:16,display:"flex",gap:8}}>
                <button className="btn btn-g" style={{flex:1,justifyContent:"center"}}><Ic n="lock" s={12}/> Change Password</button>
                <button className="btn btn-g" style={{flex:1,justifyContent:"center"}}><Ic n="shield" s={12}/> 2FA</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Dashboard ─────────────────────────────────────────────────── */
function DashboardPage({schools,exams,goTo}) {
  const [cf,setCf]=useState("All Time");
  const yearlyD=[{l:"ICS Regional",c:390,col:"#2563EB"},{l:"English Prof.",c:280,col:"#7C3AED"},{l:"Math Q1",c:560,col:"#2563EB"},{l:"Annual Scholar.",c:640,col:"#10B981"},{l:"Science Apt.",c:320,col:"#F97316"},{l:"State Olympiad",c:480,col:"#2563EB"}];
  const allD=[{l:"Olympiad '23",c:320,col:"#2563EB"},{l:"Manthan Q2",c:410,col:"#10B981"},{l:"ICS '23",c:290,col:"#7C3AED"},{l:"Scholar '23",c:580,col:"#F59E0B"},{l:"ICS Regional",c:390,col:"#2563EB"},{l:"Math Q1",c:560,col:"#2563EB"},{l:"Annual Scholar.",c:640,col:"#10B981"},{l:"State Olympiad",c:480,col:"#2563EB"}];
  const cd=cf==="Yearly"?yearlyD:allD;
  return (
    <>
      <div className="sg">
        {[{ic:"school",lbl:"Total Schools",val:String(schools.length),chg:"+8",up:true,bg:"#EFF6FF",c:"#2563EB"},{ic:"student",lbl:"Total Students",val:"12,480",chg:"+12%",up:true,bg:"#ECFDF5",c:"#10B981"},{ic:"exam",lbl:"Active Exams",val:String(exams.filter(e=>e.status!=="completed").length),chg:"+3",up:true,bg:"#FFF7ED",c:"#F97316"},{ic:"fees",lbl:"Pending Fees",val:"₹4.2L",chg:"-5%",up:false,bg:"#FEF2F2",c:"#EF4444"}].map(s=>(
          <div className="sc" key={s.lbl}>
            <div className="sc-ic" style={{background:s.bg}}><Ic n={s.ic} s={19} c={s.c}/></div>
            <span className={`sc-chg ${s.up?"up":"dn"}`}>{s.up?"↑":"↓"} {s.chg}</span>
            <div className="sc-val">{s.val}</div>
            <div className="sc-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
        {[{l:"Add School",ic:"school",bg:"#2563EB",c:"#fff",p:"schools"},{l:"Create Exam",ic:"exam",bg:"#ECFDF5",c:"#10B981",p:"exams"},{l:"Add Student",ic:"student",bg:"#EFF6FF",c:"#2563EB",p:"students"},{l:"Add Teacher",ic:"teacher",bg:"#FFF7ED",c:"#F97316",p:"teachers"},{l:"View Reports",ic:"report",bg:"#F5F3FF",c:"#7C3AED",p:"reports"}].map(b=>(
          <button key={b.l} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 13px",borderRadius:"var(--r3)",background:b.bg,color:b.c,fontSize:11.5,fontWeight:600,cursor:"pointer",border:"none",fontFamily:"inherit"}} onClick={()=>goTo(b.p)}><Ic n={b.ic} s={13} c={b.c}/>{b.l}</button>
        ))}
      </div>
      <div className="gchart" style={{marginBottom:18}}>
        {/* Chart */}
        <div className="card cp">
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
            <div><div style={{fontWeight:700,fontSize:13.5}}>Exam Performance Trend</div><div style={{fontSize:11.5,color:"var(--t3)",marginTop:2}}>Student participation per exam</div></div>
            <div style={{display:"flex",gap:4,background:"var(--bg)",padding:"3px",borderRadius:"var(--r2)"}}>
              {["Yearly","All Time"].map(x=>(
                <button key={x} style={{padding:"5px 11px",borderRadius:"var(--r3)",fontFamily:"inherit",fontSize:11.5,fontWeight:cf===x?700:500,cursor:"pointer",border:"none",background:cf===x?"#fff":"transparent",color:cf===x?"var(--p)":"var(--t2)",boxShadow:cf===x?"0 1px 3px rgba(0,0,0,.06)":"none"}} onClick={()=>setCf(x)}>{x}</button>
              ))}
            </div>
          </div>
          <div style={{display:"flex",gap:0}}>
            <div style={{display:"flex",flexDirection:"column-reverse",justifyContent:"space-between",paddingBottom:22,paddingRight:6,width:32}}>
              {[0,200,400,600,800].map(t=><span key={t} style={{fontSize:8.5,color:"var(--t3)",fontWeight:600,textAlign:"right"}}>{t>=1000?`${t/1000}k`:t}</span>)}
            </div>
            <div style={{flex:1}}>
              <div style={{position:"relative",height:150,borderLeft:"1.5px solid var(--bd)",borderBottom:"1.5px solid var(--bd)"}}>
                {[200,400,600,800].map(t=><div key={t} style={{position:"absolute",left:0,right:0,bottom:`${(t/800)*100}%`,borderTop:"1px dashed #E9EEF5"}}/>)}
                <div style={{display:"flex",alignItems:"flex-end",gap:6,height:"100%",padding:"0 8px"}}>
                  {cd.map((d,i)=>(
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",height:"100%",justifyContent:"flex-end"}}>
                      <div style={{fontSize:8.5,fontWeight:700,color:d.col,marginBottom:2}}>{d.c}</div>
                      <div style={{width:"100%",height:`${(d.c/800)*100}%`,background:d.col,borderRadius:"3px 3px 0 0",opacity:.88,minHeight:3,transition:"height .4s ease"}}/>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",gap:6,padding:"5px 8px 0"}}>
                {cd.map((d,i)=><div key={i} style={{flex:1,textAlign:"center",fontSize:8.5,color:"var(--t3)",overflow:"hidden",textOverflow:"ellipsis",fontWeight:500}}>{d.l}</div>)}
              </div>
            </div>
          </div>
        </div>
        {/* Fees donut */}
        <div className="card cp">
          <div style={{fontWeight:700,fontSize:13.5,marginBottom:2}}>Fees Collection</div>
          <div style={{fontSize:11.5,color:"var(--t3)",marginBottom:16}}>This term</div>
          <div style={{display:"flex",alignItems:"center",gap:18}}>
            <div style={{width:110,height:110,borderRadius:"50%",background:"conic-gradient(#10B981 0% 42%,#2563EB 42% 72%,#F59E0B 72% 88%,#EF4444 88% 100%)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <div style={{width:66,height:66,background:"#fff",borderRadius:"50%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <div style={{fontSize:16,fontWeight:800,color:"var(--t1)"}}>78%</div>
                <div style={{fontSize:8,color:"var(--t3)"}}>Collected</div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              {[{l:"Paid",v:"₹8.2L",c:"#10B981"},{l:"Processing",v:"₹1.8L",c:"#2563EB"},{l:"Overdue",v:"₹0.9L",c:"#F59E0B"},{l:"Defaulted",v:"₹0.4L",c:"#EF4444"}].map(x=>(
                <div key={x.l} style={{display:"flex",alignItems:"center",gap:7}}>
                  <div style={{width:8,height:8,borderRadius:2,background:x.c,flexShrink:0}}/>
                  <span style={{fontSize:12,color:"var(--t2)",flex:1}}>{x.l}</span>
                  <span style={{fontSize:12,fontWeight:700,color:"var(--t1)"}}>{x.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Top schools */}
      <div className="card cp">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:13.5}}>Top Schools by Students</div>
          <button className="btn btn-g btn-sm" onClick={()=>goTo("schools")}>View All</button>
        </div>
        <div className="g2" style={{gap:"0 24px"}}>
          {schools.slice(0,6).map((s,i)=>(
            <div key={i} style={{marginBottom:11}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,fontWeight:600}}>{s.name}</span><span style={{fontSize:11,color:"var(--t3)"}}>{s.students}</span></div>
              <div className="pw" style={{height:5}}><div className="pf pb" style={{width:`${Math.max(12,(s.students/15)*100)}%`}}/></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Schools Page ──────────────────────────────────────────────── */
function SchoolsPage({schools,setSchools,students,teachers,setTeachers,toast,goTo}) {
  const [sub,setSub] = useState("list");
  const [sel,setSel] = useState(null);
  const [edit,setEdit] = useState(null);
  const [del,setDel] = useState(null);
  const [q,setQ] = useState("");
  const [ef,setEf] = useState("All");
  const [sf,setSf] = useState("All");

  const filtered = useMemo(()=>schools.filter(s=>{
    const mQ=[s.name,s.location,s.district].join(" ").toLowerCase().includes(q.toLowerCase());
    const mE=ef==="All"||s.exams.includes(ef);
    const mS=sf==="All"||s.status===sf.toLowerCase();
    return mQ&&mE&&mS;
  }),[schools,q,ef,sf]);

  const doDelete=()=>{setSchools(p=>p.filter(s=>s.id!==del.id));toast(`"${del.name}" deleted`);setDel(null);};
  const doSave=(data)=>{
    if(edit){setSchools(p=>p.map(s=>s.id===edit.id?{...s,...data}:s));toast("School updated!");}
    else{setSchools(p=>[...p,{...data,id:Date.now(),students:0}]);toast("School added!");}
    setSub("list");setEdit(null);
  };

  if(sub==="add")   return <SchoolForm title="Add School" teachers={teachers} setTeachers={setTeachers} onSave={doSave} onBack={()=>setSub("list")} goTo={goTo}/>;
  if(sub==="edit"&&edit) return <SchoolForm title="Edit School" initial={edit} teachers={teachers} setTeachers={setTeachers} onSave={doSave} onBack={()=>{setSub("list");setEdit(null);}} goTo={goTo}/>;
  if(sub==="view"&&sel)  return <SchoolStudentsView school={sel} students={students} onBack={()=>{setSub("list");setSel(null);}}/>;
  if(sub==="upload") return <UploadExcel title="Upload Schools" columns={["School Name","Location","District","Principal","Phone","Email","Status"]} onBack={()=>setSub("list")} onSuccess={()=>{setSub("list");toast("Schools imported!");}}/>;

  return (
    <>
      <div className="ph"><div className="ph-t">Schools Management</div><div className="ph-s">Click a row to view enrolled students</div></div>
      <div className="toolbar">
        <SBox value={q} onChange={setQ} placeholder="Search school, location…"/>
        <select className="fsel" value={sf} onChange={e=>setSf(e.target.value)}><option>All</option><option>Active</option><option>Inactive</option></select>
        <button className="btn btn-p" onClick={()=>setSub("add")}><Ic n="plus" s={13} c="#fff"/> Add School</button>
        <button className="btn btn-o" onClick={()=>setSub("upload")}><Ic n="upload" s={13} c="var(--p)"/> Upload Excel</button>
        <button className="btn btn-g" style={{marginLeft:"auto"}} onClick={()=>toast("Export started!","ok")}><Ic n="download" s={12}/> Export</button>
      </div>
      {/* Exam filter pills */}
      <div className="pills" style={{marginBottom:13}}>
        {["All",...EXAM_CATS.slice(0,6)].map(e=><button key={e} className={`pill${ef===e?" on":""}`} onClick={()=>setEf(e)}>{e}</button>)}
        <span style={{fontSize:11.5,color:"var(--t3)",alignSelf:"center",marginLeft:5}}>{filtered.length} schools</span>
      </div>
      <div className="card">
        <div className="tw">
          <table>
            {/* ✅ No Teacher column | ✅ No icon before school name */}
            <thead><tr><th>School Name</th><th>Location</th><th>District</th><th>Students</th><th>Exams</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length===0
                ? <tr><td colSpan={7} style={{textAlign:"center",padding:"32px",color:"var(--t3)"}}>🏫 No schools match</td></tr>
                : filtered.map(s=>(
                  <tr key={s.id} style={{cursor:"pointer"}} onClick={()=>{setSel(s);setSub("view");}}>
                    {/* ✅ No avatar/icon - plain text name */}
                    <td><span className="tdb" style={{color:"var(--p)"}}>{s.name}</span></td>
                    <td className="td2">{s.location}</td>
                    <td className="td2">{s.district}</td>
                    <td><span style={{fontWeight:600}}>{s.students}</span></td>
                    {/* ✅ ExamPills: "Manthan +2" format */}
                    <td><ExamPills exams={s.exams}/></td>
                    <td><Bdg type={s.status==="active"?"green":"yellow"} label={s.status==="active"?"Active":"Inactive"}/></td>
                    <td onClick={ev=>ev.stopPropagation()}>
                      <div className="ra">
                        <button className="btn btn-g btn-sm" onClick={()=>{setSel(s);setSub("view");}} title="View Students"><Ic n="users" s={11}/></button>
                        <button className="btn btn-g btn-sm" onClick={()=>{setEdit(s);setSub("edit");}}><Ic n="edit" s={11}/></button>
                        <button className="btn btn-d btn-sm" onClick={()=>setDel(s)}><Ic n="trash" s={11}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {del&&<Confirm title="Delete School" msg={`Delete "${del.name}"? This cannot be undone.`} onOk={doDelete} onCancel={()=>setDel(null)}/>}
    </>
  );
}

/* School detail: students with Exam column + Class/Exam filters */
function SchoolStudentsView({school,students,onBack}) {
  const [q,setQ]=useState("");
  const [clf,setClf]=useState("All");   // ✅ Class filter
  const [examF,setExamF]=useState("All"); // ✅ Exam filter
  const list = students.filter(s=>s.schoolId===school.id);
  // collect unique exams in this school's students
  const studentExams = ["All",...new Set(list.flatMap(s=>s.exams||[]))];
  const filtered = list.filter(s=>{
    const mQ=[s.name,s.roll].join(" ").toLowerCase().includes(q.toLowerCase());
    const mC=clf==="All"||`Class ${s.class}`===clf;
    const mE=examF==="All"||(s.exams||[]).includes(examF);
    return mQ&&mC&&mE;
  });
  return (
    <>
      <BC items={["Schools",`${school.name} — Students`]} onBack={onBack}/>
      <div style={{display:"flex",gap:9,marginBottom:16}}>
        {[["Total",list.length,"#EFF6FF","#2563EB"],["Active",list.filter(s=>s.status==="active").length,"#ECFDF5","#10B981"],["Dropped",list.filter(s=>s.status!=="active").length,"#FEF2F2","#EF4444"]].map(([l,v,bg,c])=>(
          <div key={l} style={{background:bg,borderRadius:"var(--r1)",padding:"10px 14px",border:`1px solid ${bg}`}}><div style={{fontSize:19,fontWeight:800,color:c}}>{v}</div><div style={{fontSize:11,color:"var(--t3)",marginTop:1}}>{l}</div></div>
        ))}
      </div>
      {/* ✅ Class filter + Exam filter */}
      <div className="toolbar">
        <SBox value={q} onChange={setQ} placeholder="Search students…"/>
        <select className="fsel" value={clf} onChange={e=>setClf(e.target.value)}>
          <option>All</option>{["7","8","9","10"].map(c=><option key={c}>Class {c}</option>)}
        </select>
        <select className="fsel" value={examF} onChange={e=>setExamF(e.target.value)}>
          {studentExams.map(e=><option key={e}>{e}</option>)}
        </select>
        <span style={{fontSize:11.5,color:"var(--t3)",alignSelf:"center"}}>{filtered.length} students</span>
      </div>
      <div className="card">
        <div className="tw">
          <table>
            {/* ✅ Division replaced with Exam column */}
            <thead><tr><th>Student Name</th><th>Roll No.</th><th>Class</th><th>Exams</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.length===0
                ? <tr><td colSpan={5} style={{textAlign:"center",padding:"28px",color:"var(--t3)"}}>🎓 No students found</td></tr>
                : filtered.map((s,i)=>(
                  <tr key={s.id}>
                    <td><div style={{display:"flex",alignItems:"center",gap:8}}><div className="av" style={{width:26,height:26,fontSize:10,background:`hsl(${i*55+190},58%,52%)`}}>{s.name[0]}</div><span className="tdb">{s.name}</span></div></td>
                    <td className="td2">{s.roll}</td>
                    <td><Bdg type="blue" label={`Class ${s.class}`}/></td>
                    {/* ✅ Exam column instead of Division */}
                    <td><ExamPills exams={s.exams}/></td>
                    <td><Bdg type={s.status==="active"?"green":"yellow"} label={s.status==="active"?"Enrolled":"Dropped"}/></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* Add/Edit School form with Address, Pincode, Teacher dropdown + "Add New" */
function SchoolForm({title,initial,teachers,setTeachers,onSave,onBack,goTo}) {
  const [f,setF] = useState({
    name:initial?.name||"", location:initial?.location||"", district:initial?.district||"",
    address:initial?.address||"", pincode:initial?.pincode||"",
    principal:initial?.principal||"", phone:initial?.phone||"", email:initial?.email||"",
    assignedTeacherIds:initial?.assignedTeacherIds||[], exams:initial?.exams||[], status:initial?.status||"active"
  });
  const s=(k,v)=>setF(p=>({...p,[k]:v}));

  // ✅ Teacher dropdown handler — "Add New" redirects to Teacher tab
  const handleTeacherSelect=(e)=>{
    const val=e.target.value;
    if(val==="__add_new__"){ goTo("teachers"); return; }
    if(!val) return;
    const id=Number(val);
    if(!f.assignedTeacherIds.includes(id)){
      s("assignedTeacherIds",[...f.assignedTeacherIds,id]);
    }
    e.target.value="";
  };

  return (
    <>
      <BC items={["Schools",title]} onBack={onBack}/>
      <div className="card cp" style={{maxWidth:720}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:18}}>{title}</div>

        {/* School Info */}
        <div className="fsec">
          <div className="fsec-t"><Ic n="school" s={14} c="var(--p)"/> School Information</div>
          <div className="fgrid">
            <div className="fg"><label className="fl">School Name *</label><input className="fi" value={f.name} onChange={e=>s("name",e.target.value)} placeholder="e.g. Ryan International School"/></div>
            <div className="fg"><label className="fl">City *</label><input className="fi" value={f.location} onChange={e=>s("location",e.target.value)} placeholder="e.g. Mumbai"/></div>
            <div className="fg"><label className="fl">District</label><input className="fi" value={f.district} onChange={e=>s("district",e.target.value)} placeholder="e.g. Thane"/></div>
            <div className="fg"><label className="fl">Status</label><select className="fi" value={f.status} onChange={e=>s("status",e.target.value)}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
            {/* ✅ School Address */}
            <div className="fg fall"><label className="fl">School Address</label><input className="fi" value={f.address} onChange={e=>s("address",e.target.value)} placeholder="Street, Area, City"/></div>
            {/* ✅ Pincode */}
            <div className="fg"><label className="fl">Pincode</label><input className="fi" value={f.pincode} onChange={e=>s("pincode",e.target.value)} placeholder="e.g. 400071" maxLength={6}/></div>
          </div>
        </div>

        {/* Contact */}
        <div className="fsec">
          <div className="fsec-t"><Ic n="person" s={14} c="var(--p)"/> Contact Details</div>
          <div className="fgrid">
            <div className="fg"><label className="fl">Principal Name</label><input className="fi" value={f.principal} onChange={e=>s("principal",e.target.value)}/></div>
            <div className="fg"><label className="fl">Phone</label><input className="fi" value={f.phone} onChange={e=>s("phone",e.target.value)}/></div>
            <div className="fg fall"><label className="fl">Email</label><input className="fi" value={f.email} onChange={e=>s("email",e.target.value)}/></div>
          </div>
        </div>

        {/* ✅ Teacher Input with Dropdown + "Add New" option */}
        <div className="fsec">
          <div className="fsec-t"><Ic n="teacher" s={14} c="var(--p)"/> Assign Teachers</div>
          <div className="fg" style={{marginBottom:10}}>
            <label className="fl">Select Teacher to Assign</label>
            <select className="fi" defaultValue="" onChange={handleTeacherSelect}>
              <option value="" disabled>Select a teacher…</option>
              {teachers.filter(t=>!f.assignedTeacherIds.includes(t.id)).map(t=>(
                <option key={t.id} value={t.id}>{t.name} — {t.school}</option>
              ))}
              {/* ✅ "Add New" at end of list */}
              <option value="__add_new__" style={{color:"#2563EB",fontWeight:600}}>＋ Add New Teacher</option>
            </select>
          </div>
          {f.assignedTeacherIds.length>0 && (
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {f.assignedTeacherIds.map(id=>{
                const t=teachers.find(x=>x.id===id);
                return t ? (
                  <span key={id} className="tc" style={{display:"flex",alignItems:"center",gap:5,padding:"4px 9px"}}>
                    {t.name}
                    <span style={{cursor:"pointer",opacity:.7,fontWeight:700}} onClick={()=>s("assignedTeacherIds",f.assignedTeacherIds.filter(x=>x!==id))}>×</span>
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Exams */}
        <div className="fsec">
          <div className="fsec-t"><Ic n="exam" s={14} c="var(--p)"/> Assigned Exams</div>
          <div className="fg">
            <label className="fl">Select Exam Categories</label>
            <ExamMulti selected={f.exams} onChange={(v)=>s("exams",v)} allExams={EXAM_CATS}/>
          </div>
        </div>

        <div style={{display:"flex",gap:9}}>
          <button className="btn btn-p" onClick={()=>onSave(f)}><Ic n="check" s={13} c="#fff"/> {initial?"Update School":"Add School"}</button>
          <button className="btn btn-g" onClick={onBack}>Cancel</button>
        </div>
      </div>
    </>
  );
}

/* ─── Teachers Page ─────────────────────────────────────────────── */
function TeachersPage({teachers,setTeachers,schools,setSchools,students,toast,goTo}) {
  const [sub,setSub]=useState("list");
  const [view,setView]=useState(null);
  const [edit,setEdit]=useState(null);
  const [del,setDel]=useState(null);
  const [q,setQ]=useState("");
  const [ef,setEf]=useState("All");
  const [sf,setSf]=useState("All");

  const filtered=useMemo(()=>teachers.filter(t=>{
    const mQ=[t.name,t.mobile,t.school].join(" ").toLowerCase().includes(q.toLowerCase());
    const mE=ef==="All"||t.examNames.includes(ef);
    const mS=sf==="All"||t.status===sf.toLowerCase();
    return mQ&&mE&&mS;
  }),[teachers,q,ef,sf]);

  const doDelete=()=>{setTeachers(p=>p.filter(t=>t.id!==del.id));toast("Teacher removed");setDel(null);};
  const doSave=(data)=>{
    if(edit){setTeachers(p=>p.map(t=>t.id===edit.id?{...t,...data}:t));toast("Teacher updated!");}
    else{const ini=(data.name||"??").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();setTeachers(p=>[...p,{...data,id:Date.now(),initials:ini,studentCount:0,booksPurchased:0}]);toast("Teacher added!");}
    setSub("list");setEdit(null);
  };

  if(sub==="add")    return <TeacherForm title="Add Teacher" schools={schools} onSave={doSave} onBack={()=>setSub("list")} goTo={goTo}/>;
  if(sub==="edit"&&edit) return <TeacherForm title="Edit Teacher" initial={edit} schools={schools} onSave={doSave} onBack={()=>{setSub("list");setEdit(null);}} goTo={goTo}/>;
  if(sub==="view"&&view) return <TeacherView teacher={view} students={students} onBack={()=>{setSub("list");setView(null);}} onEdit={t=>{setEdit(t);setSub("edit");}}/>;
  if(sub==="upload") return <UploadExcel title="Bulk Import Teachers" columns={["Name","Mobile","Email","Exams","School","Status"]} onBack={()=>setSub("list")} onSuccess={()=>{setSub("list");toast("Teachers imported!");}}/>;

  return (
    <>
      <div className="ph"><div className="ph-t">Teachers Management</div></div>
      <div className="toolbar">
        <SBox value={q} onChange={setQ} placeholder="Search teachers, school…"/>
        <select className="fsel" value={sf} onChange={e=>setSf(e.target.value)}><option>All</option><option>Active</option><option>Inactive</option></select>
        <button className="btn btn-p" onClick={()=>setSub("add")}><Ic n="plus" s={13} c="#fff"/> Add Teacher</button>
        <button className="btn btn-o" onClick={()=>setSub("upload")}><Ic n="upload" s={13} c="var(--p)"/> Bulk Import</button>
        <button className="btn btn-g" style={{marginLeft:"auto"}} onClick={()=>toast("Export started!","ok")}><Ic n="download" s={12}/> Export</button>
      </div>
      {/* ✅ Exam filter pills */}
      <div className="pills" style={{marginBottom:13}}>
        {["All",...EXAM_CATS.slice(0,6)].map(e=><button key={e} className={`pill${ef===e?" on":""}`} onClick={()=>setEf(e)}>{e}</button>)}
        <span style={{fontSize:11.5,color:"var(--t3)",alignSelf:"center",marginLeft:5}}>{filtered.length} teachers</span>
      </div>
      <div className="card">
        <div className="tw">
          <table>
            {/* ✅ Exam column replaces Subject column */}
            <thead><tr><th>Teacher Name</th><th>Mobile</th><th>Exams</th><th>Students</th><th>School</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length===0
                ? <tr><td colSpan={7} style={{textAlign:"center",padding:"32px",color:"var(--t3)"}}>👩‍🏫 No teachers found</td></tr>
                : filtered.map(t=>(
                  <tr key={t.id}>
                    <td><div style={{display:"flex",alignItems:"center",gap:8}}><div className="av" style={{width:29,height:29,fontSize:10}}>{t.initials}</div><span className="tdb">{t.name}</span></div></td>
                    <td className="td2">{t.mobile}</td>
                    {/* ✅ ExamPills with +N format */}
                    <td><ExamPills exams={t.examNames}/></td>
                    <td><div style={{display:"flex",alignItems:"center",gap:5}}><Ic n="student" s={11} c="var(--p)"/><span style={{fontWeight:700,color:"var(--p)"}}>{t.studentCount}</span></div></td>
                    <td className="td2">{t.school}</td>
                    <td><Bdg type={t.status==="active"?"green":"yellow"} label={t.status==="active"?"Active":"Inactive"}/></td>
                    <td><div className="ra">
                      <button className="btn btn-p btn-sm" onClick={()=>{setView(t);setSub("view");}}><Ic n="eye" s={11} c="#fff"/> View</button>
                      <button className="btn btn-g btn-sm" onClick={()=>{setEdit(t);setSub("edit");}}><Ic n="edit" s={11}/></button>
                      <button className="btn btn-d btn-sm" onClick={()=>setDel(t)}><Ic n="trash" s={11}/></button>
                    </div></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {del&&<Confirm title="Remove Teacher" msg={`Remove "${del.name}"?`} onOk={doDelete} onCancel={()=>setDel(null)}/>}
    </>
  );
}

/* Teacher profile with Students/Books/Exams tables + filters */
function TeacherView({teacher,students,onBack,onEdit}) {
  const [tab,setTab]=useState("students");
  const [q,setQ]=useState("");
  const [statusF,setStatusF]=useState("All");
  const [examF,setExamF]=useState("All");

  // ✅ Students admitted by this teacher (same school)
  const myStudents = students.filter(s=>s.schoolId===teacher.schoolId);
  const filtStudents = myStudents.filter(s=>{
    const mQ=[s.name,s.roll].join(" ").toLowerCase().includes(q.toLowerCase());
    const mS=statusF==="All"||s.status===statusF.toLowerCase();
    const mE=examF==="All"||(s.exams||[]).includes(examF);
    return mQ&&mS&&mE;
  });
  const studentExams=["All",...new Set(myStudents.flatMap(s=>s.exams||[]))];

  // ✅ Books purchased list
  const booksList=[
    {title:"Manthan 2025 Practice Guide",qty:20,date:"Jan 2025",vendor:"Navneet Publications"},
    {title:"ICS Olympiad Workbook",qty:15,date:"Feb 2025",vendor:"Target Publications"},
    {title:"Shabbas Practice Set Vol.2",qty:15,date:"Mar 2025",vendor:"Navneet Publications"},
  ].slice(0, teacher.booksPurchased > 0 ? 3 : 0);

  // ✅ Exams list
  const examRows = teacher.examNames.map(e=>({
    name:e,
    students:myStudents.filter(s=>(s.exams||[]).includes(e)).length,
    status:"active"
  }));

  return (
    <>
      <BC items={["Teachers",teacher.name]} onBack={onBack}/>
      <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"flex-start"}}>
        {/* Left card */}
        <div style={{flex:"0 0 258px"}}>
          <div className="card cp" style={{textAlign:"center",marginBottom:12}}>
            <div className="av" style={{width:60,height:60,margin:"0 auto 11px",fontSize:20}}>{teacher.initials}</div>
            <div style={{fontWeight:800,fontSize:15}}>{teacher.name}</div>
            <div style={{fontSize:12,color:"var(--t3)",marginTop:2}}>{teacher.school}</div>
            <div style={{display:"flex",gap:5,justifyContent:"center",marginTop:9,flexWrap:"wrap"}}><ExamPills exams={teacher.examNames}/></div>
            <div style={{marginTop:9}}><Bdg type={teacher.status==="active"?"green":"yellow"} label={teacher.status==="active"?"Active":"Inactive"}/></div>
            <div style={{display:"flex",gap:8,marginTop:14}}>
              <button className="btn btn-p" style={{flex:1}} onClick={()=>onEdit(teacher)}><Ic n="edit" s={12} c="#fff"/> Edit</button>
              <button className="btn btn-g" style={{flex:1}}><Ic n="sms" s={12}/> Message</button>
            </div>
          </div>
          <div className="card cp">
            <div className="sec-tag">Quick Stats</div>
            <div className="g3" style={{gap:8}}>
              {[{l:"Students",v:teacher.studentCount,ic:"student",c:"#2563EB",bg:"#EFF6FF"},{l:"Books",v:teacher.booksPurchased,ic:"book",c:"#10B981",bg:"#ECFDF5"},{l:"Exams",v:teacher.examNames.length,ic:"exam",c:"#F97316",bg:"#FFF7ED"}].map(s=>(
                <div key={s.l} style={{background:s.bg,borderRadius:7,padding:"9px 6px",textAlign:"center"}}>
                  <Ic n={s.ic} s={15} c={s.c}/>
                  <div style={{fontSize:17,fontWeight:800,color:s.c,marginTop:3}}>{s.v}</div>
                  <div style={{fontSize:9.5,color:"var(--t3)",marginTop:1}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel with tables */}
        <div style={{flex:1,minWidth:280}}>
          <div className="card" style={{overflow:"visible"}}>
            <div style={{padding:"14px 18px 0"}}>
              {/* ✅ Tabs */}
              <div className="tabs-bar" style={{marginBottom:0}}>
                {["students","books","exams","details"].map(t=>(
                  <button key={t} className={`tab-btn${tab===t?" on":""}`} onClick={()=>{setTab(t);setQ("");}}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
                ))}
              </div>
            </div>
            <div style={{padding:"14px 18px"}}>
              {/* ✅ Students table with filters */}
              {tab==="students"&&(
                <>
                  <div className="toolbar" style={{marginBottom:12}}>
                    <SBox value={q} onChange={setQ} placeholder="Search students…"/>
                    <select className="fsel" value={statusF} onChange={e=>setStatusF(e.target.value)}><option>All</option><option>Active</option><option>Inactive</option></select>
                    <select className="fsel" value={examF} onChange={e=>setExamF(e.target.value)}>
                      {studentExams.map(e=><option key={e}>{e}</option>)}
                    </select>
                    <span style={{fontSize:11.5,color:"var(--t3)",alignSelf:"center"}}>{filtStudents.length} students</span>
                  </div>
                  <div className="tw"><table>
                    <thead><tr><th>Student Name</th><th>Roll</th><th>Class</th><th>Exams</th><th>Status</th></tr></thead>
                    <tbody>
                      {filtStudents.length===0
                        ? <tr><td colSpan={5} style={{textAlign:"center",padding:"20px",color:"var(--t3)",fontSize:12}}>No students found</td></tr>
                        : filtStudents.map((s,i)=>(
                          <tr key={s.id}>
                            <td><div style={{display:"flex",alignItems:"center",gap:7}}><div className="av" style={{width:24,height:24,fontSize:9,background:`hsl(${i*55+190},58%,52%)`}}>{s.name[0]}</div><span className="tdb" style={{fontSize:12}}>{s.name}</span></div></td>
                            <td className="td2" style={{fontSize:11.5}}>{s.roll}</td>
                            <td><Bdg type="blue" label={`C${s.class}`}/></td>
                            <td><ExamPills exams={s.exams}/></td>
                            <td><Bdg type={s.status==="active"?"green":"yellow"} label={s.status==="active"?"Active":"Dropped"}/></td>
                          </tr>
                        ))}
                    </tbody>
                  </table></div>
                </>
              )}
              {/* ✅ Books table */}
              {tab==="books"&&(
                <div className="tw"><table>
                  <thead><tr><th>Book Title</th><th>Vendor</th><th>Qty</th><th>Date</th></tr></thead>
                  <tbody>
                    {booksList.length===0
                      ? <tr><td colSpan={4} style={{textAlign:"center",padding:"20px",color:"var(--t3)",fontSize:12}}>No books recorded</td></tr>
                      : booksList.map((b,i)=>(
                        <tr key={i}>
                          <td className="tdb" style={{fontSize:12}}>{b.title}</td>
                          <td className="td2" style={{fontSize:11.5}}>{b.vendor}</td>
                          <td style={{fontWeight:600}}>{b.qty}</td>
                          <td className="td2" style={{fontSize:11.5}}>{b.date}</td>
                        </tr>
                      ))}
                    {booksList.length>0&&(
                      <tr style={{background:"var(--bg)"}}>
                        <td style={{fontWeight:700,fontSize:12}} colSpan={2}>Total</td>
                        <td style={{fontWeight:700,color:"var(--p)"}}>{booksList.reduce((a,b)=>a+b.qty,0)}</td>
                        <td/>
                      </tr>
                    )}
                  </tbody>
                </table></div>
              )}
              {/* ✅ Exams table */}
              {tab==="exams"&&(
                <div className="tw"><table>
                  <thead><tr><th>Exam Category</th><th>Students</th><th>Status</th></tr></thead>
                  <tbody>
                    {examRows.length===0
                      ? <tr><td colSpan={3} style={{textAlign:"center",padding:"20px",color:"var(--t3)",fontSize:12}}>No exams assigned</td></tr>
                      : examRows.map((e,i)=>(
                        <tr key={i}>
                          <td className="tdb">{e.name}</td>
                          <td>{e.students}</td>
                          <td><Bdg type="green" label="Active"/></td>
                        </tr>
                      ))}
                  </tbody>
                </table></div>
              )}
              {/* Details tab */}
              {tab==="details"&&(
                <div className="fgrid" style={{gap:9}}>
                  {[["Mobile",teacher.mobile],["Email",teacher.email],["Experience",teacher.experience||"—"],["Joined",teacher.joined||"—"],["Address",teacher.address||"—"],["Gender",teacher.gender||"—"],["Status",teacher.status]].map(([k,v])=>(
                    <div key={k} className="vf"><div className="vfl">{k}</div><div className="vfv" style={{fontSize:12.5}}>{v}</div></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* Add/Edit Teacher form — 2 sections (Professional + Personal) + ExamMulti + School "Add New" */
function TeacherForm({title,initial,schools,onSave,onBack,goTo}) {
  const [f,setF]=useState({
    name:initial?.name||"",mobile:initial?.mobile||"",email:initial?.email||"",
    examNames:initial?.examNames||[],
    school:initial?.school||"",schoolId:initial?.schoolId||"",
    status:initial?.status||"active",experience:initial?.experience||"",
    dob:initial?.dob||"",gender:initial?.gender||"",
    altPhone:initial?.altPhone||"",pincode:initial?.pincode||"",address:initial?.address||""
  });
  const s=(k,v)=>setF(p=>({...p,[k]:v}));

  const handleSchoolChange=(val)=>{
    if(val==="__add_new__"){ goTo("schools"); return; }
    const sc=schools.find(x=>x.id===Number(val));
    s("schoolId",Number(val));
    s("school",sc?.name||"");
  };

  return (
    <>
      <BC items={["Teachers",title]} onBack={onBack}/>
      <div className="card cp" style={{maxWidth:720}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:18}}>{title}</div>

        {/* ✅ Section 1: Professional Details */}
        <div className="fsec">
          <div className="fsec-t"><Ic n="briefcase" s={14} c="var(--p)"/> Professional Details</div>
          <div className="fgrid">
            <div className="fg"><label className="fl">Full Name *</label><input className="fi" value={f.name} onChange={e=>s("name",e.target.value)} placeholder="e.g. Priya Sharma"/></div>
            <div className="fg"><label className="fl">Mobile *</label><input className="fi" value={f.mobile} onChange={e=>s("mobile",e.target.value)}/></div>
            <div className="fg"><label className="fl">Email</label><input className="fi" value={f.email} onChange={e=>s("email",e.target.value)}/></div>
            <div className="fg">
              <label className="fl">School *</label>
              <select className="fi" value={f.schoolId} onChange={e=>handleSchoolChange(e.target.value)}>
                <option value="">Select school…</option>
                {schools.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}
                {/* ✅ "Add New" at end */}
                <option value="__add_new__" style={{color:"#2563EB",fontWeight:600}}>＋ Add New School</option>
              </select>
            </div>
            {/* ✅ Exam Dropdown with Checkbox multi-select */}
            <div className="fg fall">
              <label className="fl">Assigned Exams (multi-select)</label>
              <ExamMulti selected={f.examNames} onChange={(v)=>s("examNames",v)} allExams={EXAM_CATS}/>
            </div>
            <div className="fg"><label className="fl">Experience</label><input className="fi" value={f.experience} onChange={e=>s("experience",e.target.value)} placeholder="e.g. 5 Years"/></div>
            <div className="fg"><label className="fl">Status</label><select className="fi" value={f.status} onChange={e=>s("status",e.target.value)}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
          </div>
        </div>

        {/* ✅ Section 2: Personal Details */}
        <div className="fsec">
          <div className="fsec-t"><Ic n="person" s={14} c="var(--p)"/> Personal Details</div>
          <div className="fgrid">
            <div className="fg"><label className="fl">Date of Birth</label><input className="fi" type="date" value={f.dob} onChange={e=>s("dob",e.target.value)}/></div>
            <div className="fg"><label className="fl">Gender</label><select className="fi" value={f.gender} onChange={e=>s("gender",e.target.value)}><option value="">Select…</option><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div className="fg"><label className="fl">Alternate Phone</label><input className="fi" value={f.altPhone} onChange={e=>s("altPhone",e.target.value)}/></div>
            <div className="fg"><label className="fl">Pincode</label><input className="fi" value={f.pincode} onChange={e=>s("pincode",e.target.value)} maxLength={6}/></div>
            <div className="fg fall"><label className="fl">Address</label><input className="fi" value={f.address} onChange={e=>s("address",e.target.value)} placeholder="City, State"/></div>
          </div>
        </div>

        <div style={{display:"flex",gap:9}}>
          <button className="btn btn-p" onClick={()=>onSave(f)}><Ic n="check" s={13} c="#fff"/> {initial?"Update Teacher":"Add Teacher"}</button>
          <button className="btn btn-g" onClick={onBack}>Cancel</button>
        </div>
      </div>
    </>
  );
}

/* ─── Students Page ──────────────────────────────────────────────── */
function StudentsPage({students,setStudents,schools,toast}) {
  const [sub,setSub]=useState("list");
  const [view,setView]=useState(null);
  const [edit,setEdit]=useState(null);
  const [del,setDel]=useState(null);
  const [q,setQ]=useState("");
  const [scf,setScf]=useState("All Schools");
  const [clf,setClf]=useState("All");
  const [ef,setEf]=useState("All");
  const [stf,setStf]=useState("All");

  const filtered=useMemo(()=>students.filter(s=>{
    const sc=schools.find(x=>x.id===s.schoolId);
    const mQ=[s.name,s.roll,sc?.name||""].join(" ").toLowerCase().includes(q.toLowerCase());
    return mQ&&(scf==="All Schools"||sc?.name===scf)&&(clf==="All"||`Class ${s.class}`===clf)&&(ef==="All"||(s.exams||[]).includes(ef))&&(stf==="All"||s.status===stf.toLowerCase());
  }),[students,q,scf,clf,ef,stf,schools]);

  const doDelete=()=>{setStudents(p=>p.filter(s=>s.id!==del.id));toast("Student removed");setDel(null);};
  const doSave=(data)=>{
    if(edit){setStudents(p=>p.map(s=>s.id===edit.id?{...s,...data}:s));toast("Student updated!");}
    else{setStudents(p=>[...p,{...data,id:Date.now(),examScores:[]}]);toast("Student added!");}
    setSub("list");setEdit(null);
  };

  if(sub==="add")    return <StudentForm title="Add Student" schools={schools} onSave={doSave} onBack={()=>setSub("list")}/>;
  if(sub==="edit"&&edit) return <StudentForm title="Edit Student" initial={edit} schools={schools} onSave={doSave} onBack={()=>{setSub("list");setEdit(null);}}/>;
  if(sub==="view"&&view) { const sc=schools.find(x=>x.id===view.schoolId); return <StudentView student={view} school={sc} onBack={()=>{setSub("list");setView(null);}} onEdit={s=>{setEdit(s);setSub("edit");}}/>; }
  if(sub==="upload") return <UploadExcel title="Upload Students" columns={["Name","Roll","Class","Exams","School","Gender","Phone","Email"]} onBack={()=>setSub("list")} onSuccess={()=>{setSub("list");toast("Students imported!");}}/>;

  return (
    <>
      <div className="ph"><div className="ph-t">Students Management</div></div>
      <div className="toolbar">
        <SBox value={q} onChange={setQ} placeholder="Search students, roll no…"/>
        <select className="fsel" value={scf} onChange={e=>setScf(e.target.value)}><option>All Schools</option>{schools.map(s=><option key={s.id}>{s.name}</option>)}</select>
        <select className="fsel" value={clf} onChange={e=>setClf(e.target.value)}><option>All</option>{["7","8","9","10"].map(c=><option key={c}>Class {c}</option>)}</select>
        <select className="fsel" value={ef} onChange={e=>setEf(e.target.value)}><option>All</option>{EXAM_CATS.map(e=><option key={e}>{e}</option>)}</select>
        <select className="fsel" value={stf} onChange={e=>setStf(e.target.value)}><option>All</option><option>Active</option><option>Inactive</option></select>
        <button className="btn btn-p" onClick={()=>setSub("add")}><Ic n="plus" s={13} c="#fff"/> Add Student</button>
        <button className="btn btn-o" onClick={()=>setSub("upload")}><Ic n="upload" s={13} c="var(--p)"/> Upload Excel</button>
        <button className="btn btn-g" style={{marginLeft:"auto"}} onClick={()=>toast("Export started!","ok")}><Ic n="download" s={12}/> Export</button>
      </div>
      <div style={{marginBottom:11,fontSize:11.5,color:"var(--t3)"}}>{filtered.length} students</div>
      <div className="card">
        <div className="tw"><table>
          <thead><tr><th>Student Name</th><th>Roll No.</th><th>Class</th><th>Exams</th><th>School</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length===0
              ? <tr><td colSpan={7} style={{textAlign:"center",padding:"28px",color:"var(--t3)"}}>🎓 No students found</td></tr>
              : filtered.map((s,i)=>{const sc=schools.find(x=>x.id===s.schoolId);return(
                <tr key={s.id}>
                  <td><div style={{display:"flex",alignItems:"center",gap:8}}><div className="av" style={{width:27,height:27,fontSize:10,background:`hsl(${i*55+190},58%,52%)`}}>{s.name[0]}</div><span className="tdb">{s.name}</span></div></td>
                  <td className="td2">{s.roll}</td>
                  <td><Bdg type="blue" label={`Class ${s.class}`}/></td>
                  <td><ExamPills exams={s.exams}/></td>
                  <td className="td2">{sc?.name||"—"}</td>
                  <td><Bdg type={s.status==="active"?"green":"yellow"} label={s.status==="active"?"Enrolled":"Dropped"}/></td>
                  <td><div className="ra">
                    <button className="btn btn-g btn-sm" onClick={()=>{setView(s);setSub("view");}}><Ic n="eye" s={11}/></button>
                    <button className="btn btn-g btn-sm" onClick={()=>{setEdit(s);setSub("edit");}}><Ic n="edit" s={11}/></button>
                    <button className="btn btn-d btn-sm" onClick={()=>setDel(s)}><Ic n="trash" s={11}/></button>
                  </div></td>
                </tr>
              );})}
          </tbody>
        </table></div>
      </div>
      {del&&<Confirm title="Remove Student" msg={`Remove "${del.name}"?`} onOk={doDelete} onCancel={()=>setDel(null)}/>}
    </>
  );
}
function StudentView({student,school,onBack,onEdit}) {
  return (
    <>
      <BC items={["Students",student.name]} onBack={onBack}/>
      <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"flex-start"}}>
        <div style={{flex:"0 0 240px"}}>
          <div className="card cp" style={{textAlign:"center"}}>
            <div className="av" style={{width:56,height:56,margin:"0 auto 11px",fontSize:18,background:`hsl(${student.id*55+190},58%,52%)`}}>{student.name[0]}</div>
            <div style={{fontWeight:700,fontSize:14}}>{student.name}</div>
            <div style={{fontSize:12,color:"var(--t3)",marginTop:2}}>{school?.name||"—"}</div>
            <div style={{display:"flex",gap:6,justifyContent:"center",marginTop:9,flexWrap:"wrap"}}><Bdg type="blue" label={`Class ${student.class}`}/><span className="tc">Div {student.div}</span></div>
            <div style={{marginTop:9}}><ExamPills exams={student.exams}/></div>
            <button className="btn btn-p" style={{width:"100%",marginTop:14,justifyContent:"center"}} onClick={()=>onEdit(student)}><Ic n="edit" s={12} c="#fff"/> Edit Profile</button>
          </div>
        </div>
        <div style={{flex:1}}>
          <div className="card cp" style={{marginBottom:14}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>Student Details</div>
            <div className="fgrid" style={{gap:9}}>
              {[["Roll No.",student.roll],["Class",`Class ${student.class}`],["Division",`Div ${student.div}`],["Gender",student.gender||"—"],["Date of Birth",student.dob||"—"],["Phone",student.phone||"—"],["Alt. Phone",student.altPhone||"—"],["Email",student.email||"—"],["Address",student.address||"—"],["Pincode",student.pincode||"—"],["School",school?.name||"—"],["Status",student.status==="active"?"Enrolled":"Dropped"]].map(([k,v])=>(
                <div key={k} className="vf"><div className="vfl">{k}</div><div className="vfv" style={{fontSize:12.5}}>{v}</div></div>
              ))}
            </div>
          </div>
          <div className="card cp">
            <div style={{fontWeight:700,fontSize:13,marginBottom:14}}>Exam History & Scores</div>
            {student.examScores&&student.examScores.length>0 ? (
              <div className="tw"><table>
                <thead><tr><th>Exam</th><th>Score</th><th>Total</th><th>Percentage</th><th>Result</th></tr></thead>
                <tbody>
                  {student.examScores.map((e,i)=>{
                    const pct=Math.round((e.score/e.total)*100);
                    return (
                      <tr key={i}>
                        <td className="tdb">{e.exam}</td>
                        <td style={{fontWeight:700,color:"var(--p)"}}>{e.score}</td>
                        <td>{e.total}</td>
                        <td>
                          <div style={{display:"flex",alignItems:"center",gap:7}}>
                            <div className="pw" style={{width:55,height:5}}><div className={`pf ${pct>=75?"pg":"pb"}`} style={{width:`${pct}%`}}/></div>
                            <span style={{fontSize:11.5,fontWeight:700}}>{pct}%</span>
                          </div>
                        </td>
                        <td><Bdg type={pct>=75?"green":pct>=40?"yellow":"red"} label={pct>=75?"Pass":"Fail"}/></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table></div>
            ) : (
              <div style={{textAlign:"center",padding:"18px",color:"var(--t3)",fontSize:12,background:"var(--bg)",borderRadius:"var(--r2)"}}>No exam scores recorded yet</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
function StudentForm({title,initial,schools,onSave,onBack}) {
  const [f,setF]=useState({name:initial?.name||"",roll:initial?.roll||"",class:initial?.class||"",div:initial?.div||"",schoolId:initial?.schoolId||"",gender:initial?.gender||"",dob:initial?.dob||"",phone:initial?.phone||"",altPhone:initial?.altPhone||"",email:initial?.email||"",address:initial?.address||"",pincode:initial?.pincode||"",exams:initial?.exams||[],status:initial?.status||"active"});
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  return (
    <>
      <BC items={["Students",title]} onBack={onBack}/>
      <div className="card cp" style={{maxWidth:720}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:18}}>{title}</div>
        <div className="fsec">
          <div className="fsec-t"><Ic n="exam" s={14} c="var(--p)"/> Academic Details</div>
          <div className="fgrid">
            <div className="fg"><label className="fl">Full Name *</label><input className="fi" value={f.name} onChange={e=>s("name",e.target.value)}/></div>
            <div className="fg"><label className="fl">Roll Number *</label><input className="fi" value={f.roll} onChange={e=>s("roll",e.target.value)}/></div>
            <div className="fg"><label className="fl">Class *</label><select className="fi" value={f.class} onChange={e=>s("class",e.target.value)}><option value="">Select…</option>{["5","6","7","8","9","10"].map(c=><option key={c}>{c}</option>)}</select></div>
            <div className="fg"><label className="fl">Division</label><select className="fi" value={f.div} onChange={e=>s("div",e.target.value)}><option value="">Select…</option>{["A","B","C","D"].map(d=><option key={d}>{d}</option>)}</select></div>
            <div className="fg"><label className="fl">School *</label><select className="fi" value={f.schoolId} onChange={e=>s("schoolId",Number(e.target.value))}><option value="">Select…</option>{schools.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></div>
            <div className="fg"><label className="fl">Status</label><select className="fi" value={f.status} onChange={e=>s("status",e.target.value)}><option value="active">Enrolled</option><option value="inactive">Dropped</option></select></div>
            <div className="fg fall"><label className="fl">Enrolled Exams</label><ExamMulti selected={f.exams} onChange={(v)=>s("exams",v)} allExams={EXAM_CATS}/></div>
          </div>
        </div>
        <div className="fsec">
          <div className="fsec-t"><Ic n="person" s={14} c="var(--p)"/> Personal Details</div>
          <div className="fgrid">
            <div className="fg"><label className="fl">Gender</label><select className="fi" value={f.gender} onChange={e=>s("gender",e.target.value)}><option value="">Select…</option><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div className="fg"><label className="fl">Date of Birth</label><input className="fi" type="date" value={f.dob} onChange={e=>s("dob",e.target.value)}/></div>
            <div className="fg"><label className="fl">Phone</label><input className="fi" value={f.phone} onChange={e=>s("phone",e.target.value)}/></div>
            <div className="fg"><label className="fl">Alternate Phone</label><input className="fi" value={f.altPhone} onChange={e=>s("altPhone",e.target.value)}/></div>
            <div className="fg"><label className="fl">Email</label><input className="fi" value={f.email} onChange={e=>s("email",e.target.value)}/></div>
            <div className="fg"><label className="fl">Pincode</label><input className="fi" value={f.pincode} onChange={e=>s("pincode",e.target.value)} maxLength={6}/></div>
            <div className="fg fall"><label className="fl">Address</label><input className="fi" value={f.address} onChange={e=>s("address",e.target.value)} placeholder="Street, Area, City"/></div>
          </div>
        </div>
        <div style={{display:"flex",gap:9}}>
          <button className="btn btn-p" onClick={()=>onSave(f)}><Ic n="check" s={13} c="#fff"/> {initial?"Update":"Add Student"}</button>
          <button className="btn btn-g" onClick={onBack}>Cancel</button>
        </div>
      </div>
    </>
  );
}

/* ─── Exams Page ─────────────────────────────────────────────────── */
function ExamsPage({exams,setExams,teachers,centers,toast}) {
  const [sub,setSub]=useState("list");
  const [view,setView]=useState(null);
  const [edit,setEdit]=useState(null);
  const [del,setDel]=useState(null);
  const [q,setQ]=useState("");
  const [ef,setEf]=useState("All");
  const [stf,setStf]=useState("All");
  const [customCats,setCustomCats]=useState([]);
  const [customTypes,setCustomTypes]=useState([]);
  const [addCatOpen,setAddCatOpen]=useState(false);
  const [addTypeOpen,setAddTypeOpen]=useState(false);
  const [newCat,setNewCat]=useState("");
  const [newType,setNewType]=useState("");

  const allCats=[...EXAM_CATS,...customCats];
  const allTypes=[...EXAM_TYPES,...customTypes];

  const filtered=useMemo(()=>exams.filter(e=>[e.name,e.teacher,e.type].join(" ").toLowerCase().includes(q.toLowerCase())&&(ef==="All"||e.exam===ef)&&(stf==="All"||e.status===stf.toLowerCase())),[exams,q,ef,stf]);

  const doDelete=()=>{setExams(p=>p.filter(e=>e.id!==del.id));toast("Exam deleted");setDel(null);};
  const doSave=(data)=>{
    if(edit){setExams(p=>p.map(e=>e.id===edit.id?{...e,...data}:e));toast("Exam updated!");}
    else{setExams(p=>[...p,{...data,id:Date.now(),students:0}]);toast("Exam created!");}
    setSub("list");setEdit(null);
  };

  if(sub==="create") return <ExamForm title="Create Exam" teachers={teachers} centers={centers} allCats={allCats} allTypes={allTypes} setCustomCats={setCustomCats} setCustomTypes={setCustomTypes} onSave={doSave} onBack={()=>setSub("list")}/>;
  if(sub==="edit"&&edit) return <ExamForm title="Edit Exam" initial={edit} teachers={teachers} centers={centers} allCats={allCats} allTypes={allTypes} setCustomCats={setCustomCats} setCustomTypes={setCustomTypes} onSave={doSave} onBack={()=>{setSub("list");setEdit(null);}}/>;
  if(sub==="view"&&view) return <ExamDetailView exam={view} onBack={()=>{setSub("list");setView(null);}} onEdit={e=>{setEdit(e);setSub("edit");}}/>;

  return (
    <>
      <div className="ph"><div className="ph-t">Exams Management</div></div>
      <div className="toolbar">
        <SBox value={q} onChange={setQ} placeholder="Search exams, teacher…"/>
        <select className="fsel" value={stf} onChange={e=>setStf(e.target.value)}><option>All</option><option>Active</option><option>Upcoming</option><option>Completed</option></select>
        <button className="btn btn-p" onClick={()=>setSub("create")}><Ic n="plus" s={13} c="#fff"/> Create Exam</button>
        <button className="btn btn-g" style={{marginLeft:"auto"}} onClick={()=>toast("Export started!","ok")}><Ic n="download" s={12}/> Export</button>
      </div>
      <div className="pills" style={{marginBottom:13}}>
        {["All",...EXAM_CATS.slice(0,6)].map(e=><button key={e} className={`pill${ef===e?" on":""}`} onClick={()=>setEf(e)}>{e}</button>)}
        <span style={{fontSize:11.5,color:"var(--t3)",alignSelf:"center",marginLeft:5}}>{filtered.length} exams</span>
      </div>
      <div className="card">
        <div className="tw"><table>
          <thead><tr><th>Exam Name</th><th>Category</th><th>Type</th><th>Date</th><th>Teacher</th><th>Students</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length===0
              ? <tr><td colSpan={8} style={{textAlign:"center",padding:"28px",color:"var(--t3)"}}>📝 No exams found</td></tr>
              : filtered.map(e=>(
                <tr key={e.id} style={{cursor:"pointer"}} onClick={()=>{setView(e);setSub("view");}}>
                  <td className="tdb">{e.name}</td>
                  <td><span className="tc">{e.exam}</span></td>
                  <td><Bdg type="blue" label={e.type}/></td>
                  <td className="td2">{new Date(e.date).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</td>
                  <td className="td2">{e.teacher}</td>
                  <td style={{fontWeight:600}}>{e.students}</td>
                  <td><Bdg type={e.status==="completed"?"green":e.status==="active"?"blue":"yellow"} label={e.status.charAt(0).toUpperCase()+e.status.slice(1)}/></td>
                  <td onClick={ev=>ev.stopPropagation()}><div className="ra">
                    <button className="btn btn-p btn-sm" onClick={()=>{setView(e);setSub("view");}}><Ic n="eye" s={11} c="#fff"/></button>
                    <button className="btn btn-g btn-sm" onClick={()=>{setEdit(e);setSub("edit");}}><Ic n="edit" s={11}/></button>
                    <button className="btn btn-d btn-sm" onClick={()=>setDel(e)}><Ic n="trash" s={11}/></button>
                  </div></td>
                </tr>
              ))}
          </tbody>
        </table></div>
      </div>
      {del&&<Confirm title="Delete Exam" msg={`Delete "${del.name}"?`} onOk={doDelete} onCancel={()=>setDel(null)}/>}
    </>
  );
}

function ExamDetailView({exam,onBack,onEdit}) {
  const dt=new Date(exam.date).toLocaleDateString("en-IN",{dateStyle:"long"});
  const pct=Math.round((exam.students/exam.maxStudents)*100)||0;
  return (
    <>
      <BC items={["Exams",exam.name]} onBack={onBack}/>
      <div className="card" style={{overflow:"hidden"}}>
        {/* Header gradient */}
        <div className="edc-hdr">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
                <span style={{background:"rgba(255,255,255,.25)",padding:"3px 10px",borderRadius:20,fontSize:10.5,fontWeight:700}}>{exam.exam}</span>
                <span style={{background:exam.status==="completed"?"#ECFDF5":"rgba(255,255,255,.2)",color:exam.status==="completed"?"#059669":"#fff",padding:"3px 10px",borderRadius:20,fontSize:10.5,fontWeight:700}}>{exam.status.charAt(0).toUpperCase()+exam.status.slice(1)}</span>
              </div>
              <div style={{fontSize:20,fontWeight:800,marginBottom:6}}>{exam.name}</div>
              <div style={{fontSize:12.5,opacity:.8,maxWidth:480}}>{exam.description}</div>
            </div>
            <button className="btn" style={{background:"rgba(255,255,255,.2)",color:"#fff",border:"1.5px solid rgba(255,255,255,.3)",flexShrink:0}} onClick={()=>onEdit(exam)}><Ic n="edit" s={13} c="#fff"/> Edit</button>
          </div>
          {/* Quick stats strip */}
          <div style={{display:"flex",gap:10,marginTop:18,flexWrap:"wrap"}}>
            {[["Students",exam.students,"student"],["Duration",`${exam.duration} min`,"calendar"],["Seats",exam.maxStudents,"users"],["Teacher",exam.teacher,"teacher"]].map(([l,v,ic])=>(
              <div key={l} style={{background:"rgba(255,255,255,.15)",borderRadius:"var(--r2)",padding:"11px 14px",flex:1,minWidth:100}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}><Ic n={ic} s={12} c="rgba(255,255,255,.75)"/><span style={{fontSize:10,opacity:.75}}>{l}</span></div>
                <div style={{fontWeight:700,fontSize:14}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Body */}
        <div style={{padding:"18px 20px"}}>
          <div className="fgrid" style={{gap:10,marginBottom:18}}>
            {[["Exam Name",exam.name],["Category",exam.exam],["Type",exam.type],["Date",dt],["Center",exam.center||"—"],["Duration",`${exam.duration} min`],["Max Students",exam.maxStudents],["Status",exam.status]].map(([k,v])=>(
              <div key={k} className="vf"><div className="vfl">{k}</div><div className="vfv" style={{fontSize:13}}>{v}</div></div>
            ))}
            {exam.description&&<div className="vf fall"><div className="vfl">Description</div><div className="vfv" style={{fontWeight:400,fontSize:12.5}}>{exam.description}</div></div>}
          </div>
          {/* Occupancy bar */}
          <div style={{background:"var(--bg)",borderRadius:"var(--r2)",padding:"13px 14px",border:"1px solid var(--bd)"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:12,fontWeight:600}}>Seat Occupancy</span>
              <span style={{fontSize:12,fontWeight:700,color:"var(--p)"}}>{pct}%</span>
            </div>
            <div className="pw" style={{height:8}}><div className="pf pb" style={{width:`${Math.min(pct,100)}%`}}/></div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:5,fontSize:11,color:"var(--t3)"}}><span>{exam.students} enrolled</span><span>{exam.maxStudents} capacity</span></div>
          </div>
        </div>
      </div>
    </>
  );
}

function ExamForm({title,initial,teachers,centers,allCats,allTypes,setCustomCats,setCustomTypes,onSave,onBack}) {
  const [f,setF]=useState({name:initial?.name||"",exam:initial?.exam||"",type:initial?.type||"",date:initial?.date||"",teacher:initial?.teacher||"",center:initial?.center||"",maxStudents:initial?.maxStudents||"",duration:initial?.duration||"",status:initial?.status||"upcoming",description:initial?.description||""});
  const [addCatOpen,setAddCatOpen]=useState(false);
  const [addTypeOpen,setAddTypeOpen]=useState(false);
  const [newCat,setNewCat]=useState("");
  const [newType,setNewType]=useState("");
  const s=(k,v)=>setF(p=>({...p,[k]:v}));

  return (
    <>
      <BC items={["Exams",title]} onBack={onBack}/>
      <div className="card cp" style={{maxWidth:680}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:18}}>{title}</div>
        <div className="fgrid">
          <div className="fg fall"><label className="fl">Exam Name *</label><input className="fi" value={f.name} onChange={e=>s("name",e.target.value)} placeholder="e.g. State Level Olympiad 2025"/></div>
          <div className="fg">
            <label className="fl">Category *</label>
            <select className="fi" value={f.exam} onChange={e=>{if(e.target.value==="__add__")setAddCatOpen(true);else s("exam",e.target.value);}}>
              <option value="">Select…</option>
              {allCats.map(x=><option key={x} value={x}>{x}</option>)}
              <option value="__add__" style={{color:"#2563EB",fontWeight:600}}>＋ Add New Category</option>
            </select>
          </div>
          <div className="fg">
            <label className="fl">Type</label>
            <select className="fi" value={f.type} onChange={e=>{if(e.target.value==="__add__")setAddTypeOpen(true);else s("type",e.target.value);}}>
              <option value="">Select…</option>
              {allTypes.map(x=><option key={x} value={x}>{x}</option>)}
              <option value="__add__" style={{color:"#2563EB",fontWeight:600}}>＋ Add New Type</option>
            </select>
          </div>
          <div className="fg"><label className="fl">Date *</label><input className="fi" type="date" value={f.date} onChange={e=>s("date",e.target.value)}/></div>
          <div className="fg"><label className="fl">Duration (min)</label><input className="fi" type="number" value={f.duration} onChange={e=>s("duration",e.target.value)}/></div>
          <div className="fg"><label className="fl">Assign Teacher</label><select className="fi" value={f.teacher} onChange={e=>s("teacher",e.target.value)}><option value="">Select…</option>{teachers.map(t=><option key={t.id}>{t.name}</option>)}</select></div>
          <div className="fg"><label className="fl">Assign Center</label><select className="fi" value={f.center} onChange={e=>s("center",e.target.value)}><option value="">Select…</option>{centers.map(c=><option key={c.id}>{c.name}</option>)}</select></div>
          <div className="fg"><label className="fl">Max Students</label><input className="fi" type="number" value={f.maxStudents} onChange={e=>s("maxStudents",e.target.value)}/></div>
          <div className="fg"><label className="fl">Status</label><select className="fi" value={f.status} onChange={e=>s("status",e.target.value)}><option value="upcoming">Upcoming</option><option value="active">Active</option><option value="completed">Completed</option></select></div>
          <div className="fg fall"><label className="fl">Description</label><textarea className="ta" value={f.description} onChange={e=>s("description",e.target.value)}/></div>
        </div>
        <div style={{display:"flex",gap:9,marginTop:18}}>
          <button className="btn btn-p" onClick={()=>onSave(f)}><Ic n="check" s={13} c="#fff"/> {initial?"Update":"Create Exam"}</button>
          <button className="btn btn-g" onClick={onBack}>Cancel</button>
        </div>
      </div>
      {addCatOpen&&(
        <div className="modal-bg" onClick={()=>setAddCatOpen(false)}>
          <div className="modal modal-sm" onClick={e=>e.stopPropagation()}>
            <div className="mhdr"><div className="mhdr-t">Add New Category</div><button className="xbtn" onClick={()=>setAddCatOpen(false)}><Ic n="x" s={13}/></button></div>
            <div className="mbody"><div className="fg"><label className="fl">Category Name</label><input className="fi" value={newCat} onChange={e=>setNewCat(e.target.value)} placeholder="e.g. Sparsh" autoFocus/></div></div>
            <div className="mfoot">
              <button className="btn btn-g" onClick={()=>setAddCatOpen(false)}>Cancel</button>
              <button className="btn btn-p" onClick={()=>{if(newCat.trim()){setCustomCats(p=>[...p,newCat.trim()]);s("exam",newCat.trim());setNewCat("");}setAddCatOpen(false);}}><Ic n="check" s={13} c="#fff"/> Add</button>
            </div>
          </div>
        </div>
      )}
      {addTypeOpen&&(
        <div className="modal-bg" onClick={()=>setAddTypeOpen(false)}>
          <div className="modal modal-sm" onClick={e=>e.stopPropagation()}>
            <div className="mhdr"><div className="mhdr-t">Add New Type</div><button className="xbtn" onClick={()=>setAddTypeOpen(false)}><Ic n="x" s={13}/></button></div>
            <div className="mbody"><div className="fg"><label className="fl">Type Name</label><input className="fi" value={newType} onChange={e=>setNewType(e.target.value)} placeholder="e.g. Regional" autoFocus/></div></div>
            <div className="mfoot">
              <button className="btn btn-g" onClick={()=>setAddTypeOpen(false)}>Cancel</button>
              <button className="btn btn-p" onClick={()=>{if(newType.trim()){setCustomTypes(p=>[...p,newType.trim()]);s("type",newType.trim());setNewType("");}setAddTypeOpen(false);}}><Ic n="check" s={13} c="#fff"/> Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Books Page ─────────────────────────────────────────────────── */
function BooksPage({books,setBooks,schools,toast}) {
  const [sub,setSub]=useState("list");
  const [edit,setEdit]=useState(null);
  const [q,setQ]=useState("");
  const [scf,setScf]=useState("All");
  const [stf,setStf]=useState("All");

  const filtered=useMemo(()=>books.filter(b=>[b.teacher,b.school].join(" ").toLowerCase().includes(q.toLowerCase())&&(scf==="All"||b.school===scf)&&(stf==="All"||b.status===stf.toLowerCase())),[books,q,scf,stf]);

  const doSave=(data)=>{ setBooks(p=>p.map(b=>b.id===edit.id?{...b,...data,status:data.purchased<40?"critical":data.purchased<48?"low":"ok"}:b)); toast("Book record updated!"); setSub("list");setEdit(null); };
  const doAdd=(data)=>{ setBooks(p=>[...p,{...data,id:Date.now(),status:data.purchased<40?"critical":data.purchased<48?"low":"ok"}]); toast("Book record added!"); setSub("list"); };

  if(sub==="add")  return <BookAddForm schools={schools} allTeachers={books} onSave={doAdd} onBack={()=>setSub("list")}/>;
  if(sub==="edit"&&edit) return <BookEditForm book={edit} onSave={doSave} onBack={()=>{setSub("list");setEdit(null);}}/>;

  return (
    <>
      <div className="ph"><div className="ph-t">Books Tracking</div></div>
      <div className="mr">
        {[[books.reduce((a,b)=>a+b.purchased,0),"Total Purchased","#EFF6FF","#2563EB"],[books.reduce((a,b)=>a+b.students,0),"Total Students","#ECFDF5","#10B981"],[books.filter(b=>b.status==="low").length,"Low Stock","#FFFBEB","#F59E0B"],[books.filter(b=>b.status==="critical").length,"Critical","#FEF2F2","#EF4444"]].map(([v,l,bg,c])=>(
          <div key={l} className="mc" style={{background:bg}}><div className="mv" style={{color:c}}>{v}</div><div className="ml">{l}</div></div>
        ))}
      </div>
      <div className="toolbar">
        <SBox value={q} onChange={setQ} placeholder="Search teacher, school…"/>
        <select className="fsel" value={scf} onChange={e=>setScf(e.target.value)}><option>All</option>{schools.map(s=><option key={s.id}>{s.name}</option>)}</select>
        <select className="fsel" value={stf} onChange={e=>setStf(e.target.value)}><option>All</option><option>Ok</option><option>Low</option><option>Critical</option></select>
        <button className="btn btn-p" onClick={()=>setSub("add")}><Ic n="plus" s={13} c="#fff"/> Add Book</button>
        <button className="btn btn-g" style={{marginLeft:"auto"}} onClick={()=>toast("Export started!","ok")}><Ic n="download" s={12}/> Export</button>
      </div>
      <div className="card">
        <div className="tw"><table>
          <thead><tr><th>Teacher Name</th><th>School</th><th>Books Purchased</th><th>Students</th><th>Stock Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map((b,i)=>(
              <tr key={i} className={b.status==="critical"?"crit":b.status==="low"?"low":""}>
                <td className="tdb">{b.teacher}</td>
                <td className="td2">{b.school}</td>
                <td style={{fontWeight:700}}>{b.purchased}</td>
                <td><div style={{display:"flex",alignItems:"center",gap:5}}><Ic n="users" s={11} c="var(--p)"/><span style={{fontWeight:600,color:"var(--p)"}}>{b.students}</span></div></td>
                <td><Bdg type={b.status==="critical"?"red":b.status==="low"?"yellow":"green"} label={b.status==="critical"?"Critical":b.status==="low"?"Low Stock":"Sufficient"}/></td>
                <td><div className="ra">
                  <button className="btn btn-g btn-sm" onClick={()=>{setEdit(b);setSub("edit");}}><Ic n="edit" s={11}/> Edit</button>
                  <button className="btn btn-g btn-sm" onClick={()=>toast(`Reminder sent to ${b.teacher}`,"ok")}>Remind</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </>
  );
}
function BookAddForm({schools,allTeachers,onSave,onBack}) {
  const [f,setF]=useState({teacher:"",school:"",schoolId:"",bookTitle:"",purchased:0,students:0,purchaseDate:"",vendor:"",notes:""});
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  const handleTeacher=(val)=>{
    const t=allTeachers.find(x=>x.teacher===val);
    if(t){s("teacher",val);s("school",t.school);s("schoolId",t.schoolId);}else s("teacher",val);
  };
  return (
    <>
      <BC items={["Books","Add Book Record"]} onBack={onBack}/>
      <div className="card cp" style={{maxWidth:680}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:18}}>Add Book Record</div>
        <div className="fsec">
          <div className="fsec-t"><Ic n="book" s={14} c="var(--p)"/> Book Information</div>
          <div className="fgrid">
            <div className="fg fall"><label className="fl">Book Title *</label><input className="fi" value={f.bookTitle} onChange={e=>s("bookTitle",e.target.value)} placeholder="e.g. Manthan 2025 Practice Guide"/></div>
            <div className="fg"><label className="fl">Vendor / Publisher</label><input className="fi" value={f.vendor} onChange={e=>s("vendor",e.target.value)} placeholder="e.g. Navneet Publications"/></div>
            <div className="fg"><label className="fl">Purchase Date</label><input className="fi" type="date" value={f.purchaseDate} onChange={e=>s("purchaseDate",e.target.value)}/></div>
            <div className="fg"><label className="fl">Qty Purchased *</label><input className="fi" type="number" value={f.purchased} onChange={e=>s("purchased",Number(e.target.value))} min={0}/></div>
            <div className="fg"><label className="fl">Student Count</label><input className="fi" type="number" value={f.students} onChange={e=>s("students",Number(e.target.value))} min={0}/></div>
            <div className="fg fall"><label className="fl">Notes</label><input className="fi" value={f.notes} onChange={e=>s("notes",e.target.value)} placeholder="Any additional notes…"/></div>
          </div>
        </div>
        <div className="fsec">
          <div className="fsec-t"><Ic n="teacher" s={14} c="var(--p)"/> Assignment</div>
          <div className="fgrid">
            <div className="fg">
              <label className="fl">Assign to Teacher *</label>
              <select className="fi" value={f.teacher} onChange={e=>handleTeacher(e.target.value)}>
                <option value="">Select teacher…</option>
                {[...new Set(allTeachers.map(t=>t.teacher))].map(n=><option key={n}>{n}</option>)}
              </select>
            </div>
            <div className="fg"><label className="fl">School</label><input className="fi" value={f.school} disabled/></div>
          </div>
          {f.purchased>0&&(
            <div style={{marginTop:11,padding:"9px 12px",borderRadius:"var(--r3)",background:f.purchased<40?"#FEF2F2":f.purchased<48?"#FFFBEB":"#ECFDF5",border:`1px solid ${f.purchased<40?"#FECACA":f.purchased<48?"#FDE68A":"#A7F3D0"}`}}>
              <span style={{fontWeight:600,fontSize:12.5,color:f.purchased<40?"#EF4444":f.purchased<48?"#F59E0B":"#10B981"}}>
                {f.purchased<40?"⚠ Critical stock level":f.purchased<48?"⚠ Low stock — consider ordering more":"✓ Sufficient stock level"}
              </span>
            </div>
          )}
        </div>
        <div style={{display:"flex",gap:9}}>
          <button className="btn btn-p" onClick={()=>onSave({teacher:f.teacher,school:f.school,schoolId:f.schoolId,purchased:f.purchased,students:f.students})}><Ic n="check" s={13} c="#fff"/> Add Book Record</button>
          <button className="btn btn-g" onClick={onBack}>Cancel</button>
        </div>
      </div>
    </>
  );
}
function BookEditForm({book,onSave,onBack}) {
  const [f,setF]=useState({purchased:book.purchased,students:book.students});
  return (
    <>
      <BC items={["Books",`Edit — ${book.teacher}`]} onBack={onBack}/>
      <div className="card cp" style={{maxWidth:500}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:18}}>Edit Book Record</div>
        <div className="fgrid">
          <div className="fg"><label className="fl">Teacher</label><input className="fi" value={book.teacher} disabled/></div>
          <div className="fg"><label className="fl">School</label><input className="fi" value={book.school} disabled/></div>
          <div className="fg"><label className="fl">Books Purchased *</label><input className="fi" type="number" value={f.purchased} onChange={e=>setF(p=>({...p,purchased:Number(e.target.value)}))} min={0}/></div>
          <div className="fg"><label className="fl">Students Count *</label><input className="fi" type="number" value={f.students} onChange={e=>setF(p=>({...p,students:Number(e.target.value)}))} min={0}/></div>
          <div className="fg fall">
            <div style={{padding:"9px 12px",borderRadius:"var(--r3)",background:f.purchased<40?"#FEF2F2":f.purchased<48?"#FFFBEB":"#ECFDF5",border:`1px solid ${f.purchased<40?"#FECACA":f.purchased<48?"#FDE68A":"#A7F3D0"}`}}>
              <span style={{fontWeight:600,fontSize:12.5,color:f.purchased<40?"#EF4444":f.purchased<48?"#F59E0B":"#10B981"}}>{f.purchased<40?"⚠ Critical":f.purchased<48?"⚠ Low Stock":"✓ Sufficient"}</span>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:9,marginTop:16}}>
          <button className="btn btn-p" onClick={()=>onSave(f)}><Ic n="check" s={13} c="#fff"/> Update</button>
          <button className="btn btn-g" onClick={onBack}>Cancel</button>
        </div>
      </div>
    </>
  );
}

/* ─── Fees Page ──────────────────────────────────────────────────── */
function FeesPage({fees,schools,toast}) {
  const [sub,setSub]=useState("list");
  const [view,setView]=useState(null);
  const [q,setQ]=useState("");
  const [stf,setStf]=useState("All");
  const [scf,setScf]=useState("All Schools");
  const filtered=useMemo(()=>fees.filter(f=>[f.teacher,f.school].join(" ").toLowerCase().includes(q.toLowerCase())&&(stf==="All"||f.status===stf.toLowerCase())&&(scf==="All Schools"||f.school===scf)),[fees,q,stf,scf]);

  if(sub==="view"&&view) return <FeesView fee={view} onBack={()=>{setSub("list");setView(null);}}/>;
  return (
    <>
      <div className="ph"><div className="ph-t">Fees Management</div></div>
      <div className="mr">
        {[[`₹${(fees.reduce((a,f)=>a+f.total,0)/1000).toFixed(0)}k`,"Total","#EFF6FF","#2563EB"],[`₹${(fees.reduce((a,f)=>a+f.paid,0)/1000).toFixed(0)}k`,"Collected","#ECFDF5","#10B981"],[`₹${(fees.reduce((a,f)=>a+f.pending,0)/1000).toFixed(0)}k`,"Pending","#FEF2F2","#EF4444"]].map(([v,l,bg,c])=>(
          <div key={l} className="mc" style={{background:bg}}><div className="mv" style={{color:c}}>{v}</div><div className="ml">{l}</div></div>
        ))}
        <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
          <button className="btn btn-p"><Ic n="send" s={12} c="#fff"/> Send Reminders</button>
          <button className="btn btn-g"><Ic n="download" s={12}/> Export</button>
        </div>
      </div>
      <div className="toolbar">
        <SBox value={q} onChange={setQ} placeholder="Search teacher, school…"/>
        <select className="fsel" value={scf} onChange={e=>setScf(e.target.value)}><option>All Schools</option>{schools.map(s=><option key={s.id}>{s.name}</option>)}</select>
        <div className="pills">{["All","Paid","Partial","Pending"].map(s=><button key={s} className={`pill${stf===s?" on":""}`} onClick={()=>setStf(s)}>{s}</button>)}</div>
      </div>
      <div className="card">
        <div className="tw"><table>
          <thead><tr><th>Teacher</th><th>School</th><th>Total</th><th>Paid</th><th>Pending</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map((f,i)=>(
              <tr key={i}>
                <td className="tdb">{f.teacher}</td><td className="td2">{f.school}</td>
                <td style={{fontWeight:600}}>₹{f.total.toLocaleString()}</td>
                <td style={{color:"var(--gd)",fontWeight:600}}>₹{f.paid.toLocaleString()}</td>
                <td style={{color:f.pending>0?"var(--rd)":"var(--t3)",fontWeight:600}}>{f.pending>0?`₹${f.pending.toLocaleString()}`:"—"}</td>
                <td><Bdg type={f.status==="paid"?"green":f.status==="partial"?"yellow":"red"} label={f.status.charAt(0).toUpperCase()+f.status.slice(1)}/></td>
                <td><div className="ra">
                  <button className="btn btn-p btn-sm" onClick={()=>{setView(f);setSub("view");}}><Ic n="eye" s={11} c="#fff"/> View</button>
                  {f.pending>0&&<button className="btn btn-o btn-sm">Remind</button>}
                </div></td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </>
  );
}
function FeesView({fee,onBack}) {
  const pct=Math.round((fee.paid/fee.total)*100)||0;
  return (
    <>
      <BC items={["Fees",fee.teacher]} onBack={onBack}/>
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        <div style={{flex:"0 0 248px"}}>
          <div className="card cp" style={{marginBottom:12}}>
            <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:12}}>
              <div className="av" style={{width:44,height:44,fontSize:14}}>{fee.teacher.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
              <div><div style={{fontWeight:700,fontSize:13.5}}>{fee.teacher}</div><div style={{fontSize:11.5,color:"var(--t3)"}}>{fee.school}</div></div>
            </div>
            <Bdg type={fee.status==="paid"?"green":fee.status==="partial"?"yellow":"red"} label={fee.status.charAt(0).toUpperCase()+fee.status.slice(1)}/>
            <div style={{marginTop:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11.5,color:"var(--t3)"}}>Progress</span><span style={{fontSize:11.5,fontWeight:700,color:"var(--gd)"}}>{pct}%</span></div>
              <div className="pw" style={{height:7}}><div className="pf pg" style={{width:`${pct}%`}}/></div>
            </div>
          </div>
          <div className="card cp">
            {[["Total Fees",`₹${fee.total.toLocaleString()}`,"var(--t1)"],["Paid",`₹${fee.paid.toLocaleString()}`,"var(--gd)"],["Pending",`₹${fee.pending.toLocaleString()}`,fee.pending>0?"var(--rd)":"var(--gd)"]].map(([k,v,c])=>(
              <div key={k} className="ir"><span className="ik">{k}</span><span style={{fontSize:13.5,fontWeight:700,color:c}}>{v}</span></div>
            ))}
          </div>
        </div>
        <div style={{flex:1}}>
          <div className="card cp">
            <div style={{fontSize:11,fontWeight:700,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:12}}>Payment History</div>
            {fee.paid>0 ? (
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 13px",background:"var(--gl)",borderRadius:"var(--r3)",marginBottom:8}}>
                <div><div style={{fontWeight:600,fontSize:12.5}}>Payment Received</div><div style={{fontSize:11.5,color:"var(--t3)",marginTop:2}}>15 Apr 2025 · NEFT · Ref: TXN2025041501</div></div>
                <div style={{fontWeight:700,color:"var(--gd)",fontSize:14}}>₹{fee.paid.toLocaleString()}</div>
              </div>
            ) : <div style={{textAlign:"center",padding:"20px",color:"var(--t3)",fontSize:12}}>No payments yet</div>}
            {fee.pending>0&&(
              <div style={{padding:"12px 13px",background:"#FEF2F2",borderRadius:"var(--r3)",border:"1px solid #FECACA",marginTop:10}}>
                <div style={{fontWeight:600,fontSize:12.5,color:"#EF4444",marginBottom:7}}>Pending: ₹{fee.pending.toLocaleString()}</div>
                <button className="btn btn-d btn-sm"><Ic n="sms" s={11}/> Send Reminder</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Centers Page ───────────────────────────────────────────────── */
function CentersPage({centers,setCenters,toast}) {
  const [sub,setSub]=useState("list");
  const [view,setView]=useState(null);
  const [edit,setEdit]=useState(null);
  const [del,setDel]=useState(null);
  const [q,setQ]=useState("");
  const [cf,setCf]=useState("All");
  const ws=centers.map(c=>({...c,pct:Math.round((c.assigned/c.capacity)*100),st:c.assigned>=c.capacity?"full":c.assigned/c.capacity>0.8?"high":"ok"}));
  const filtered=useMemo(()=>ws.filter(c=>[c.name,c.city].join(" ").toLowerCase().includes(q.toLowerCase())&&(cf==="All"||(cf==="Full"&&c.st==="full")||(cf==="High"&&c.st==="high")||(cf==="Available"&&c.st==="ok"))),[ws,q,cf]);
  const doDelete=()=>{setCenters(p=>p.filter(c=>c.id!==del.id));toast("Center deleted");setDel(null);};
  const doSave=(data)=>{
    if(edit){setCenters(p=>p.map(c=>c.id===edit.id?{...c,...data}:c));toast("Center updated!");}
    else{setCenters(p=>[...p,{...data,id:Date.now(),assigned:0}]);toast("Center added!");}
    setSub("list");setEdit(null);
  };
  if(sub==="add")   return <CenterForm title="Add Center" onSave={doSave} onBack={()=>setSub("list")}/>;
  if(sub==="edit"&&edit) return <CenterForm title="Edit Center" initial={edit} onSave={doSave} onBack={()=>{setSub("list");setEdit(null);}}/>;
  if(sub==="view"&&view) return <CenterView center={ws.find(c=>c.id===view.id)||view} onBack={()=>{setSub("list");setView(null);}} onEdit={c=>{setEdit(c);setSub("edit");}}/>;
  return (
    <>
      <div className="ph"><div className="ph-t">Centers Management</div></div>
      <div className="toolbar">
        <SBox value={q} onChange={setQ} placeholder="Search center, city…"/>
        <div className="pills">{["All","Available","High","Full"].map(s=><button key={s} className={`pill${cf===s?" on":""}`} onClick={()=>setCf(s)}>{s}</button>)}</div>
        <button className="btn btn-p" style={{marginLeft:"auto"}} onClick={()=>setSub("add")}><Ic n="plus" s={13} c="#fff"/> Add Center</button>
        <button className="btn btn-g" onClick={()=>toast("Export started!","ok")}><Ic n="download" s={12}/> Export</button>
      </div>
      <div className="card">
        <div className="tw"><table>
          <thead><tr><th>Center Name</th><th>City</th><th>In-charge</th><th>Capacity</th><th>Assigned</th><th>Occupancy</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(c=>(
              <tr key={c.id}>
                <td className="tdb">{c.name}</td><td className="td2">{c.city}</td><td className="td2">{c.incharge}</td>
                <td>{c.capacity}</td><td style={{fontWeight:600,color:c.st==="full"?"var(--rd)":"var(--t1)"}}>{c.assigned}</td>
                <td style={{minWidth:110}}><div style={{display:"flex",alignItems:"center",gap:6}}><div className="pw" style={{flex:1,height:5}}><div className={`pf ${c.pct>=100?"pr":c.pct>80?"py":"pb"}`} style={{width:`${Math.min(c.pct,100)}%`}}/></div><span style={{fontSize:11,fontWeight:600,color:"var(--t3)"}}>{c.pct}%</span></div></td>
                <td>{c.st==="full"?<Bdg type="red" label="Full"/>:c.st==="high"?<Bdg type="yellow" label="High"/>:<Bdg type="green" label="Available"/>}</td>
                <td><div className="ra">
                  <button className="btn btn-p btn-sm" onClick={()=>{setView(c);setSub("view");}}><Ic n="eye" s={11} c="#fff"/></button>
                  <button className="btn btn-g btn-sm" onClick={()=>{setEdit(c);setSub("edit");}}><Ic n="edit" s={11}/></button>
                  <button className="btn btn-d btn-sm" onClick={()=>setDel(c)}><Ic n="trash" s={11}/></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
      {del&&<Confirm title="Delete Center" msg={`Delete "${del.name}"?`} onOk={doDelete} onCancel={()=>setDel(null)}/>}
    </>
  );
}
function CenterView({center,onBack,onEdit}) {
  return (
    <>
      <BC items={["Centers",center.name]} onBack={onBack}/>
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        <div style={{flex:"0 0 250px"}}>
          <div className="card cp">
            <div style={{width:40,height:40,background:"#EFF6FF",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}><Ic n="center" s={19} c="var(--p)"/></div>
            <div style={{fontWeight:700,fontSize:14}}>{center.name}</div>
            <div style={{fontSize:12,color:"var(--t3)",marginTop:2}}>{center.city}, {center.state}</div>
            <div style={{marginTop:8}}>{center.st==="full"?<Bdg type="red" label="Full"/>:center.st==="high"?<Bdg type="yellow" label="High"/>:<Bdg type="green" label="Available"/>}</div>
            <div style={{marginTop:11}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11.5,color:"var(--t3)"}}>Occupancy</span><span style={{fontSize:11.5,fontWeight:700}}>{center.pct}%</span></div>
              <div className="pw" style={{height:7}}><div className={`pf ${center.pct>=100?"pr":center.pct>80?"py":"pg"}`} style={{width:`${Math.min(center.pct,100)}%`}}/></div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:10.5,color:"var(--t3)"}}><span>{center.assigned} assigned</span><span>{center.capacity} total</span></div>
            </div>
            <button className="btn btn-p" style={{width:"100%",marginTop:13,justifyContent:"center"}} onClick={()=>onEdit(center)}><Ic n="edit" s={12} c="#fff"/> Edit Center</button>
          </div>
        </div>
        <div style={{flex:1}}>
          <div className="card cp">
            <div className="fgrid" style={{gap:9}}>
              {[["Name",center.name],["City",center.city],["State",center.state||"—"],["Address",center.address||"—"],["Capacity",center.capacity],["Assigned",center.assigned],["In-charge",center.incharge||"—"],["Contact",center.contact||"—"]].map(([k,v])=>(
                <div key={k} className="vf"><div className="vfl">{k}</div><div className="vfv" style={{fontSize:12.5}}>{v}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function CenterForm({title,initial,onSave,onBack}) {
  const [f,setF]=useState({name:initial?.name||"",city:initial?.city||"",state:initial?.state||"",address:initial?.address||"",capacity:initial?.capacity||"",incharge:initial?.incharge||"",contact:initial?.contact||""});
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  return (
    <>
      <BC items={["Centers",title]} onBack={onBack}/>
      <div className="card cp" style={{maxWidth:580}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:18}}>{title}</div>
        <div className="fgrid">
          <div className="fg fall"><label className="fl">Center Name *</label><input className="fi" value={f.name} onChange={e=>s("name",e.target.value)}/></div>
          <div className="fg"><label className="fl">City *</label><input className="fi" value={f.city} onChange={e=>s("city",e.target.value)}/></div>
          <div className="fg"><label className="fl">State</label><input className="fi" value={f.state} onChange={e=>s("state",e.target.value)}/></div>
          <div className="fg fall"><label className="fl">Full Address</label><input className="fi" value={f.address} onChange={e=>s("address",e.target.value)}/></div>
          <div className="fg"><label className="fl">Capacity *</label><input className="fi" type="number" value={f.capacity} onChange={e=>s("capacity",Number(e.target.value))}/></div>
          <div className="fg"><label className="fl">Contact</label><input className="fi" value={f.contact} onChange={e=>s("contact",e.target.value)}/></div>
          <div className="fg fall"><label className="fl">In-charge Name</label><input className="fi" value={f.incharge} onChange={e=>s("incharge",e.target.value)}/></div>
        </div>
        <div style={{display:"flex",gap:9,marginTop:18}}>
          <button className="btn btn-p" onClick={()=>onSave(f)}><Ic n="check" s={13} c="#fff"/> {initial?"Update":"Add Center"}</button>
          <button className="btn btn-g" onClick={onBack}>Cancel</button>
        </div>
      </div>
    </>
  );
}

/* ─── Notifications Page ─────────────────────────────────────────── */
function NotificationsPage() {
  const [q,setQ]=useState("");const[tf,setTf]=useState("All");
  const sent=[{title:"Exam Reminder - Olympiad 2025",target:"All Teachers",type:"SMS",sent:"2 hours ago",count:142},{title:"Fee Payment Deadline",target:"Pending Fee Teachers",type:"Alert",sent:"1 day ago",count:28},{title:"New Exam Schedule",target:"All Students",type:"SMS",sent:"3 days ago",count:1240},{title:"Book Return Reminder",target:"Low Stock Teachers",type:"Alert",sent:"5 days ago",count:15},{title:"ICS Results Published",target:"All Schools",type:"Push",sent:"1 week ago",count:890}];
  const filt=sent.filter(s=>[s.title,s.target].join(" ").toLowerCase().includes(q.toLowerCase())&&(tf==="All"||s.type===tf));
  return (
    <>
      <div className="ph"><div className="ph-t">Notifications</div></div>
      <div className="g2" style={{gap:16}}>
        <div>
          <div className="card cp" style={{marginBottom:13}}>
            <div style={{fontWeight:700,fontSize:13.5,marginBottom:13}}>Compose Message</div>
            <div className="fg" style={{marginBottom:9}}><label className="fl">Title</label><input className="fi" placeholder="e.g. Exam Reminder"/></div>
            <div className="fg" style={{marginBottom:9}}><label className="fl">Send To</label><select className="fi"><option>All Teachers</option><option>All Students</option><option>All Schools</option><option>Pending Fee Teachers</option><option>Low Stock Teachers</option></select></div>
            <div className="fg" style={{marginBottom:13}}><label className="fl">Message</label><textarea className="ta" placeholder="Type your message here…"/></div>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              <button className="btn btn-p"><Ic n="sms" s={12} c="#fff"/> Send SMS</button>
              <button className="btn btn-o"><Ic n="info" s={12} c="var(--p)"/> Alert</button>
              <button className="btn btn-g"><Ic n="notif" s={12}/> Push</button>
            </div>
          </div>
          <div className="card cp">
            <div style={{fontWeight:700,fontSize:13,marginBottom:11}}>Quick Templates</div>
            {["Exam Reminder","Fee Due Notice","Book Return Alert","Result Published","Schedule Update"].map(t=>(
              <div key={t} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--bd)"}}>
                <span style={{fontSize:12.5,fontWeight:500}}>{t}</span>
                <button className="btn btn-g btn-sm">Use</button>
              </div>
            ))}
          </div>
        </div>
        <div className="card cp">
          <div style={{fontWeight:700,fontSize:13.5,marginBottom:13}}>Sent History</div>
          <div className="toolbar" style={{marginBottom:13}}>
            <SBox value={q} onChange={setQ} placeholder="Search…"/>
            <div className="pills">{["All","SMS","Alert","Push"].map(t=><button key={t} className={`pill${tf===t?" on":""}`} onClick={()=>setTf(t)}>{t}</button>)}</div>
          </div>
          {filt.map((s,i)=>(
            <div key={i} style={{padding:"11px 0",borderBottom:"1px solid var(--bd)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                <span style={{fontWeight:600,fontSize:12.5}}>{s.title}</span>
                <span className={`bdg ${s.type==="SMS"?"bdg-b":s.type==="Alert"?"bdg-y":"bdg-g"}`}><span className="bdot"/>{s.type}</span>
              </div>
              <div style={{fontSize:11,color:"var(--t3)"}}>→ {s.target}</div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                <span style={{fontSize:11,color:"var(--t3)"}}>{s.sent}</span>
                <span style={{fontSize:11,fontWeight:600,color:"var(--gd)"}}>{s.count} delivered</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Reports Page ───────────────────────────────────────────────── */
function ReportsPage({schools,exams}) {
  const [q,setQ]=useState("");const[scf,setScf]=useState("All");const[ef,setEf]=useState("All");
  const rows=[{school:"Ryan International",exam:"Olympiad 2025",students:480,pass:425,fail:55,pct:88,fees:"paid"},{school:"Delhi Public School",exam:"Aptitude Test",students:320,pass:262,fail:58,pct:82,fees:"partial"},{school:"Podar International",exam:"Math Olympiad",students:560,pass:443,fail:117,pct:79,fees:"paid"},{school:"St. Mary's Convent",exam:"Proficiency",students:280,pass:207,fail:73,pct:74,fees:"pending"},{school:"Kendriya Vidyalaya",exam:"ICS Regional",students:390,pass:280,fail:110,pct:72,fees:"partial"}];
  const filt=rows.filter(r=>[r.school,r.exam].join(" ").toLowerCase().includes(q.toLowerCase()));
  const pd=[75,82,68,90,78,85,72,88,65,91,80,76];
  const months=["J","F","M","A","M","J","J","A","S","O","N","D"];
  return (
    <>
      <div className="ph"><div className="ph-t">Reports & Analytics</div></div>
      <div className="card cp" style={{marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:13,marginBottom:11}}>Filters</div>
        <div className="toolbar">
          <SBox value={q} onChange={setQ} placeholder="Search school, exam…"/>
          <select className="fsel" value={scf} onChange={e=>setScf(e.target.value)}><option>All</option>{schools.map(s=><option key={s.id}>{s.name}</option>)}</select>
          <div className="pills">{["All",...EXAM_CATS.slice(0,4)].map(e=><button key={e} className={`pill${ef===e?" on":""}`} onClick={()=>setEf(e)}>{e}</button>)}</div>
          <button className="btn btn-p" style={{marginLeft:"auto"}}><Ic n="download" s={12} c="#fff"/> Export PDF</button>
        </div>
      </div>
      <div className="sg" style={{marginBottom:16}}>
        {[{l:"Avg Pass Rate",v:"79.4%",ic:"trend",c:"#10B981",bg:"#ECFDF5"},{l:"Total Exams",v:String(exams.length),ic:"exam",c:"#2563EB",bg:"#EFF6FF"},{l:"Fees Collected",v:"₹47.5L",ic:"fees",c:"#7C3AED",bg:"#F5F3FF"},{l:"Top School",v:"Ryan Intl.",ic:"school",c:"#F97316",bg:"#FFF7ED"}].map(s=>(
          <div className="sc" key={s.l}><div className="sc-ic" style={{background:s.bg}}><Ic n={s.ic} s={18} c={s.c}/></div><div className="sc-val" style={{fontSize:21}}>{s.v}</div><div className="sc-lbl">{s.l}</div></div>
        ))}
      </div>
      <div className="gchart" style={{marginBottom:16}}>
        <div className="card cp">
          <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>Monthly Pass Rate</div>
          <div style={{display:"flex"}}>
            <div style={{display:"flex",flexDirection:"column-reverse",justifyContent:"space-between",paddingBottom:20,paddingRight:5,width:26}}>
              {[0,25,50,75,100].map(t=><span key={t} style={{fontSize:8,color:"var(--t3)",fontWeight:600,textAlign:"right"}}>{t}%</span>)}
            </div>
            <div style={{flex:1}}>
              <div style={{position:"relative",height:120,borderLeft:"1.5px solid var(--bd)",borderBottom:"1.5px solid var(--bd)"}}>
                {[25,50,75,100].map(t=><div key={t} style={{position:"absolute",left:0,right:0,bottom:`${t}%`,borderTop:"1px dashed #E9EEF5"}}/>)}
                <div style={{display:"flex",alignItems:"flex-end",gap:4,height:"100%",padding:"0 4px"}}>
                  {pd.map((v,i)=><div key={i} style={{flex:1,height:`${v}%`,background:v>85?"#10B981":v<70?"#EF4444":"#2563EB",borderRadius:"2px 2px 0 0",opacity:.85}}/>)}
                </div>
              </div>
              <div style={{display:"flex",gap:4,padding:"4px 4px 0"}}>{months.map(m=><div key={m} style={{flex:1,textAlign:"center",fontSize:8,color:"var(--t3)"}}>{m}</div>)}</div>
            </div>
          </div>
        </div>
        <div className="card cp">
          <div style={{fontWeight:700,fontSize:13,marginBottom:12}}>School-wise Performance</div>
          {[{n:"Ryan International",r:88},{n:"Delhi Public",r:82},{n:"Podar Intl.",r:79},{n:"St. Mary's",r:74},{n:"Kendriya V.",r:71}].map(s=>(
            <div key={s.n} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,fontWeight:600}}>{s.n}</span><span style={{fontSize:12,fontWeight:700,color:s.r>80?"var(--gd)":"var(--t2)"}}>{s.r}%</span></div>
              <div className="pw" style={{height:5}}><div className={`pf ${s.r>80?"pg":"pb"}`} style={{width:`${s.r}%`}}/></div>
            </div>
          ))}
        </div>
      </div>
      <div className="card cp">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:13}}>Detailed Report</div>
          <button className="btn btn-g btn-sm"><Ic n="download" s={11}/> CSV</button>
        </div>
        <div className="tw"><table>
          <thead><tr><th>School</th><th>Exam</th><th>Students</th><th>Pass</th><th>Fail</th><th>Pass Rate</th><th>Fees</th></tr></thead>
          <tbody>
            {filt.map((r,i)=>(
              <tr key={i}>
                <td className="tdb">{r.school}</td><td className="td2">{r.exam}</td><td>{r.students}</td>
                <td style={{color:"var(--gd)",fontWeight:600}}>{r.pass}</td><td style={{color:"var(--rd)",fontWeight:600}}>{r.fail}</td>
                <td><div style={{display:"flex",alignItems:"center",gap:6}}><div className="pw" style={{width:50,height:5}}><div className={`pf ${r.pct>80?"pg":"pb"}`} style={{width:`${r.pct}%`}}/></div><span style={{fontSize:11,fontWeight:700}}>{r.pct}%</span></div></td>
                <td><Bdg type={r.fees==="paid"?"green":r.fees==="partial"?"yellow":"red"} label={r.fees.charAt(0).toUpperCase()+r.fees.slice(1)}/></td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </>
  );
}

/* ─── Settings Page ──────────────────────────────────────────────── */
function SettingsPage() {
  const [tab,setTab]=useState("roles");
  const [prefs,setPrefs]=useState({email:true,sms:true,report:false,dark:false,tfa:true});
  const roles=[{name:"Super Admin",users:1,c:"#2563EB",perms:["Full Access"]},{name:"Exam Manager",users:3,c:"#10B981",perms:["Exams","Centers","Reports"]},{name:"School Coordinator",users:8,c:"#F97316",perms:["Schools","Teachers","Students"]},{name:"Finance Officer",users:2,c:"#7C3AED",perms:["Fees","Reports"]}];
  return (
    <>
      <div className="ph"><div className="ph-t">Settings</div><div className="ph-s">Roles & Permissions · Exam Templates · System Preferences</div></div>
      <div className="tabs-bar">
        {[{id:"roles",ic:"role",l:"Roles & Permissions"},{id:"templates",ic:"template",l:"Exam Templates"},{id:"prefs",ic:"pref",l:"Preferences"},{id:"account",ic:"lock",l:"Account"}].map(t=>(
          <button key={t.id} className={`tab-btn${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)} style={{display:"flex",alignItems:"center",gap:5}}><Ic n={t.ic} s={11}/>{t.l}</button>
        ))}
      </div>
      {tab==="roles"&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><div style={{fontWeight:700,fontSize:14}}>Role Management</div><button className="btn btn-p"><Ic n="plus" s={13} c="#fff"/> Add Role</button></div>
          <div className="g2">
            {roles.map((r,i)=>(
              <div key={i} className="card cp">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:11}}>
                  <div style={{display:"flex",alignItems:"center",gap:9}}>
                    <div style={{width:38,height:38,background:r.c+"20",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="shield" s={18} c={r.c}/></div>
                    <div><div style={{fontWeight:700,fontSize:13.5}}>{r.name}</div><div style={{fontSize:11,color:"var(--t3)"}}>{r.users} user{r.users!==1?"s":""}</div></div>
                  </div>
                  <button className="btn btn-g btn-sm"><Ic n="edit" s={11}/> Edit</button>
                </div>
                <div className="sec-tag">Permissions</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{r.perms.map(p=><span key={p} className="tc" style={{fontSize:9.5}}>{p}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==="templates"&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><div style={{fontWeight:700,fontSize:14}}>Exam Templates</div><button className="btn btn-p"><Ic n="plus" s={13} c="#fff"/> New Template</button></div>
          <div className="g2">
            {[{n:"Olympiad Template",t:"Olympiad",d:"120 min",q:80,c:"#2563EB",bg:"#EFF6FF"},{n:"Scholarship Template",t:"Scholarship",d:"180 min",q:100,c:"#10B981",bg:"#ECFDF5"},{n:"Aptitude Template",t:"Aptitude",d:"90 min",q:60,c:"#F97316",bg:"#FFF7ED"},{n:"Proficiency Template",t:"Proficiency",d:"60 min",q:50,c:"#7C3AED",bg:"#F5F3FF"}].map((t,i)=>(
              <div key={i} className="card cp">
                <div style={{width:40,height:40,background:t.bg,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}><Ic n="template" s={18} c={t.c}/></div>
                <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{t.n}</div>
                <div style={{fontSize:11.5,color:"var(--t3)",marginBottom:10}}>{t.t} · {t.d} · {t.q} Qs</div>
                <div style={{display:"flex",gap:7}}><button className="btn btn-o btn-sm" style={{flex:1}}>Preview</button><button className="btn btn-g btn-sm" style={{flex:1}}><Ic n="edit" s={11}/> Edit</button></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==="prefs"&&(
        <div className="g2">
          <div className="card cp">
            <div style={{fontWeight:700,fontSize:13.5,marginBottom:14}}>Notification Preferences</div>
            {[["Email Notifications","email"],["SMS Notifications","sms"],["Auto Reports","report"],["Dark Mode","dark"],["Two-factor Auth","tfa"]].map(([l,k])=>(
              <div key={k} className="perm-row">
                <div style={{fontSize:13,fontWeight:600}}>{l}</div>
                <div className="tog" style={{background:prefs[k]?"var(--p)":"var(--bd)"}} onClick={()=>setPrefs(p=>({...p,[k]:!p[k]}))}>
                  <div className="tok" style={{left:prefs[k]?20:3}}/>
                </div>
              </div>
            ))}
            <button className="btn btn-p" style={{marginTop:16}}><Ic n="check" s={13} c="#fff"/> Save</button>
          </div>
          <div className="card cp">
            <div style={{fontWeight:700,fontSize:13.5,marginBottom:14}}>General Settings</div>
            <div style={{display:"flex",flexDirection:"column",gap:11}}>
              <div className="fg"><label className="fl">Platform Name</label><input className="fi" defaultValue="ExamPro Management Platform"/></div>
              <div className="fg"><label className="fl">Admin Email</label><input className="fi" defaultValue="admin@exampro.in"/></div>
              <div className="fg"><label className="fl">Language</label><select className="fi"><option>English</option><option>Hindi</option><option>Marathi</option></select></div>
              <div className="fg"><label className="fl">Timezone</label><select className="fi"><option>Asia/Kolkata (IST)</option></select></div>
              <button className="btn btn-p"><Ic n="check" s={13} c="#fff"/> Save Changes</button>
            </div>
          </div>
        </div>
      )}
      {tab==="account"&&(
        <div className="g2">
          <div className="card cp">
            <div style={{fontWeight:700,fontSize:13.5,marginBottom:14}}>Change Password</div>
            <div style={{display:"flex",flexDirection:"column",gap:11}}>
              <div className="fg"><label className="fl">Current Password</label><input className="fi" type="password" placeholder="••••••••"/></div>
              <div className="fg"><label className="fl">New Password</label><input className="fi" type="password" placeholder="••••••••"/></div>
              <div className="fg"><label className="fl">Confirm Password</label><input className="fi" type="password" placeholder="••••••••"/></div>
              <button className="btn btn-p"><Ic n="lock" s={13} c="#fff"/> Update Password</button>
            </div>
          </div>
          <div className="card cp">
            <div style={{fontWeight:700,fontSize:13.5,marginBottom:14}}>Security</div>
            {[["Two-Factor Auth",true],["Login Alerts",true],["Session Timeout",false]].map(([t,on])=>(
              <div key={t} className="perm-row">
                <div style={{fontSize:13,fontWeight:600}}>{t}</div>
                <div className="tog" style={{background:on?"var(--p)":"var(--bd)"}}><div className="tok" style={{left:on?20:3}}/></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
