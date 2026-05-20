import { useState, useMemo, useCallback } from "react";

/* ═══════════════════════ GLOBAL CSS ═══════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --p:#2563EB;--pl:#EFF6FF;--pm:#DBEAFE;--pd:#1D4ED8;--pxl:#E0EAFF;
  --g:#10B981;--gl:#ECFDF5;--gd:#059669;
  --w:#F59E0B;--wl:#FFFBEB;--wd:#D97706;
  --r:#EF4444;--rl:#FEF2F2;--rd:#DC2626;
  --pu:#7C3AED;--pul:#F5F3FF;
  --t1:#0F172A;--t2:#475569;--t3:#94A3B8;--t4:#CBD5E1;
  --bd:#E2E8F0;--bg:#F1F5F9;--bg2:#F8FAFC;--wh:#FFFFFF;
  --sw:256px;--sh:60px;
  --r1:12px;--r2:8px;--r3:6px;
  --s1:0 1px 2px rgba(0,0,0,.05),0 1px 3px rgba(0,0,0,.04);
  --s2:0 4px 16px rgba(0,0,0,.07),0 2px 4px rgba(0,0,0,.04);
  --s3:0 10px 30px rgba(0,0,0,.1),0 4px 8px rgba(0,0,0,.05);
  --s4:0 20px 50px rgba(0,0,0,.14),0 8px 16px rgba(0,0,0,.06);
}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--t1);line-height:1.5;-webkit-font-smoothing:antialiased}
.layout{display:flex;height:100vh;overflow:hidden}

/* ── SIDEBAR ── */
.sb{width:var(--sw);min-width:var(--sw);background:var(--wh);border-right:1px solid var(--bd);display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden;z-index:50}
.sb::-webkit-scrollbar{width:3px}.sb::-webkit-scrollbar-thumb{background:var(--t4);border-radius:4px}
.sb-brand{display:flex;align-items:center;gap:11px;padding:20px 18px 16px;border-bottom:1px solid var(--bd)}
.brand-logo{width:38px;height:38px;background:linear-gradient(135deg,#2563EB,#4F46E5);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(37,99,235,.3)}
.brand-name{font-size:14.5px;font-weight:800;color:var(--t1);line-height:1.2;letter-spacing:-.3px}
.brand-sub{font-size:10.5px;color:var(--t3);font-weight:400;margin-top:1px}
.sb-section{padding:16px 10px 6px}
.sb-label{font-size:10px;font-weight:700;color:var(--t4);letter-spacing:.1em;text-transform:uppercase;padding:0 8px 8px}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:var(--r3);cursor:pointer;transition:all .15s ease;font-size:13px;font-weight:500;color:var(--t2);margin-bottom:1px;position:relative}
.nav-item:hover{background:var(--bg);color:var(--t1)}
.nav-item.active{background:var(--pl);color:var(--p);font-weight:600}
.nav-item.active .nav-ic{opacity:1;color:var(--p)}
.nav-ic{width:17px;height:17px;flex-shrink:0;opacity:.6;transition:opacity .15s}
.nav-badge{margin-left:auto;background:var(--r);color:#fff;font-size:9.5px;font-weight:700;padding:2px 6px;border-radius:20px;min-width:18px;text-align:center;line-height:1.4}
.nav-badge.blue{background:var(--p)}
.nav-badge.green{background:var(--g)}
.sb-footer{margin-top:auto;padding:10px;border-top:1px solid var(--bd)}
.user-row{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:var(--r3);cursor:pointer;transition:background .15s}
.user-row:hover{background:var(--bg)}
.av{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#2563EB,#7C3AED);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0}
.user-name{font-size:13px;font-weight:600;color:var(--t1);line-height:1.2}
.user-role{font-size:11px;color:var(--t3)}

/* ── MAIN ── */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;background:var(--bg)}

/* ── HEADER ── */
.hdr{height:var(--sh);min-height:var(--sh);background:var(--wh);border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:14px;padding:0 24px;z-index:40;box-shadow:0 1px 0 var(--bd)}
.hdr-left{display:flex;align-items:center;gap:6px;min-width:0}
.hdr-title{font-size:15px;font-weight:700;color:var(--t1);white-space:nowrap}
.hdr-search{flex:1;max-width:300px;margin-left:auto;display:flex;align-items:center;gap:8px;background:var(--bg);border:1.5px solid var(--bd);border-radius:var(--r2);padding:7px 12px;transition:border-color .15s}
.hdr-search:focus-within{border-color:var(--p);box-shadow:0 0 0 3px rgba(37,99,235,.08)}
.hdr-search input{background:none;border:none;outline:none;font-family:inherit;font-size:13px;color:var(--t1);width:100%}
.hdr-search input::placeholder{color:var(--t3)}
.hdr-actions{display:flex;align-items:center;gap:6px;margin-left:10px}
.hbtn{width:36px;height:36px;border-radius:var(--r3);display:flex;align-items:center;justify-content:center;border:1.5px solid var(--bd);background:var(--wh);cursor:pointer;color:var(--t2);transition:all .15s;position:relative;flex-shrink:0}
.hbtn:hover{background:var(--bg);color:var(--p);border-color:var(--pm)}
.hbtn.active{background:var(--pl);color:var(--p);border-color:var(--pm)}
.hbtn-dot{position:absolute;top:6px;right:6px;width:8px;height:8px;background:var(--r);border-radius:50%;border:2px solid #fff}
.hdr-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#2563EB,#7C3AED);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;cursor:pointer;border:2px solid transparent;transition:all .15s;flex-shrink:0}
.hdr-avatar:hover{border-color:var(--p);box-shadow:0 0 0 3px rgba(37,99,235,.15)}
.hdr-avatar.active{border-color:var(--p);box-shadow:0 0 0 3px rgba(37,99,235,.15)}

/* ── CONTENT ── */
.cnt{flex:1;overflow-y:auto;padding:24px}
.cnt::-webkit-scrollbar{width:5px}.cnt::-webkit-scrollbar-thumb{background:var(--t4);border-radius:4px}

/* ── CARDS ── */
.card{background:var(--wh);border-radius:var(--r1);border:1px solid var(--bd);box-shadow:var(--s1)}
.cp{padding:22px}

/* ── STAT CARDS ── */
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:20px}
.stat-card{background:var(--wh);border-radius:var(--r1);border:1px solid var(--bd);padding:20px;box-shadow:var(--s1);transition:all .2s ease;cursor:pointer}
.stat-card:hover{box-shadow:var(--s2);transform:translateY(-2px);border-color:var(--pm)}
.stat-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px}
.stat-icon{width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center}
.stat-badge{font-size:11px;font-weight:600;padding:3px 8px;border-radius:20px}
.stat-badge.up{background:var(--gl);color:var(--gd)}
.stat-badge.dn{background:var(--rl);color:var(--rd)}
.stat-val{font-size:28px;font-weight:800;color:var(--t1);letter-spacing:-.5px;line-height:1}
.stat-lbl{font-size:12.5px;color:var(--t2);margin-top:4px;font-weight:500}

/* ── CHART GRID ── */
.chart-grid{display:grid;grid-template-columns:1.7fr 1fr;gap:16px;margin-bottom:20px}

/* ── PAGE HEADER ── */
.ph{margin-bottom:20px}
.ph-title{font-size:20px;font-weight:800;color:var(--t1);letter-spacing:-.4px}
.ph-sub{font-size:13px;color:var(--t3);margin-top:3px}

/* ── BREADCRUMB ── */
.bc{display:flex;align-items:center;gap:6px;margin-bottom:18px;font-size:12.5px}
.bc-back{display:flex;align-items:center;gap:4px;color:var(--p);font-weight:600;cursor:pointer;transition:opacity .15s}
.bc-back:hover{opacity:.75}
.bc-sep{color:var(--t4)}
.bc-cur{color:var(--t1);font-weight:600}

/* ── TOOLBAR ── */
.tb{display:flex;align-items:center;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.srch{display:flex;align-items:center;gap:8px;background:var(--wh);border:1.5px solid var(--bd);border-radius:var(--r2);padding:8px 12px;min-width:210px;transition:border-color .15s}
.srch:focus-within{border-color:var(--p);box-shadow:0 0 0 3px rgba(37,99,235,.08)}
.srch input{background:none;border:none;outline:none;font-family:inherit;font-size:13px;color:var(--t1);width:100%}
.srch input::placeholder{color:var(--t3)}
.sel{padding:8px 10px;border-radius:var(--r3);border:1.5px solid var(--bd);background:var(--wh);font-family:inherit;font-size:12.5px;color:var(--t1);outline:none;cursor:pointer;transition:border-color .15s}
.sel:focus{border-color:var(--p)}

/* ── PILLS ── */
.pills{display:flex;gap:5px;flex-wrap:wrap}
.pill{padding:5px 14px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;border:1.5px solid var(--bd);background:var(--wh);color:var(--t2);transition:all .15s;font-family:inherit}
.pill:hover{border-color:var(--p);color:var(--p)}
.pill.on{background:var(--p);color:#fff;border-color:var(--p)}

/* ── BUTTONS ── */
.btn{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:var(--r3);font-family:inherit;font-size:12.5px;font-weight:600;cursor:pointer;transition:all .15s;border:none;white-space:nowrap;line-height:1}
.bp{background:var(--p);color:#fff}.bp:hover{background:var(--pd);box-shadow:0 4px 12px rgba(37,99,235,.3)}
.bo{background:transparent;color:var(--p);border:1.5px solid var(--p)}.bo:hover{background:var(--pl)}
.bg_{background:var(--bg);color:var(--t2);border:1.5px solid var(--bd)}.bg_:hover{background:var(--bd);color:var(--t1)}
.bsm{padding:6px 11px;font-size:11.5px}
.bdn{background:var(--rl);color:var(--rd);border:1.5px solid #FECACA}.bdn:hover{background:#FEE2E2}
.bsuc{background:var(--gl);color:var(--gd);border:1.5px solid #A7F3D0}
.btn-icon{width:34px;height:34px;padding:0;justify-content:center;border-radius:var(--r3);background:var(--bg);color:var(--t2);border:1.5px solid var(--bd)}.btn-icon:hover{background:var(--bd)}

/* ── TABLE ── */
.tw{overflow-x:auto}
table{width:100%;border-collapse:collapse}
thead th{font-size:10.5px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.07em;padding:10px 16px;text-align:left;background:var(--bg2);border-bottom:1px solid var(--bd);white-space:nowrap}
tbody tr{border-bottom:1px solid var(--bd);transition:background .1s}
tbody tr:last-child{border-bottom:none}
tbody tr:hover{background:#F8FBFF}
tbody td{padding:12px 16px;font-size:13px;color:var(--t1);vertical-align:middle}
.td2{color:var(--t2);font-size:12.5px}
.tdb{font-weight:600}
.row-acts{display:flex;gap:5px;opacity:0;transition:opacity .15s}
tbody tr:hover .row-acts{opacity:1}

/* ── BADGES ── */
.bdg{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap}
.bdg-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
.bdg-g{background:var(--gl);color:var(--gd)}.bdg-g .bdg-dot{background:var(--gd)}
.bdg-r{background:var(--rl);color:var(--rd)}.bdg-r .bdg-dot{background:var(--rd)}
.bdg-y{background:var(--wl);color:var(--wd)}.bdg-y .bdg-dot{background:var(--wd)}
.bdg-b{background:var(--pl);color:var(--p)}.bdg-b .bdg-dot{background:var(--p)}
.bdg-pu{background:var(--pul);color:var(--pu)}.bdg-pu .bdg-dot{background:var(--pu)}

/* ── FORM ── */
.fg{display:flex;flex-direction:column;gap:5px}
.fl{font-size:11.5px;font-weight:600;color:var(--t2)}
.fi{padding:9px 12px;border-radius:var(--r3);border:1.5px solid var(--bd);background:var(--wh);font-family:inherit;font-size:13px;color:var(--t1);outline:none;transition:border-color .15s}
.fi:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(37,99,235,.08)}
.fi::placeholder{color:var(--t3)}
.fi:disabled{background:var(--bg);color:var(--t3);cursor:not-allowed}
.ta{width:100%;padding:9px 12px;border-radius:var(--r3);border:1.5px solid var(--bd);font-family:inherit;font-size:13px;color:var(--t1);resize:vertical;min-height:90px;outline:none;transition:border-color .15s}
.ta:focus{border-color:var(--p);box-shadow:0 0 0 3px rgba(37,99,235,.08)}
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.fgrid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
.fgall{grid-column:1/-1}

/* ── MODAL ── */
.mov{position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;animation:ao .18s ease}
.mdl{background:#fff;border-radius:var(--r1);width:100%;max-height:90vh;display:flex;flex-direction:column;box-shadow:var(--s4);animation:mu .22s cubic-bezier(.34,1.56,.64,1)}
.mdl-sm{max-width:460px}.mdl-md{max-width:620px}.mdl-lg{max-width:820px}
@keyframes ao{from{opacity:0}to{opacity:1}}
@keyframes mu{from{transform:scale(.94) translateY(12px);opacity:0}to{transform:scale(1);opacity:1}}
.mhdr{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--bd);flex-shrink:0}
.mhdr-t{font-size:15px;font-weight:700;color:var(--t1)}
.mhdr-s{font-size:12px;color:var(--t3);margin-top:2px}
.mbody{overflow-y:auto;flex:1;padding:24px}
.mbody::-webkit-scrollbar{width:3px}.mbody::-webkit-scrollbar-thumb{background:var(--t4);border-radius:4px}
.mfoot{padding:16px 24px;border-top:1px solid var(--bd);display:flex;gap:10px;justify-content:flex-end;flex-shrink:0;background:var(--bg2);border-radius:0 0 var(--r1) var(--r1)}
.close-btn{width:32px;height:32px;border-radius:var(--r3);border:1.5px solid var(--bd);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--t2);transition:all .15s;flex-shrink:0}
.close-btn:hover{background:var(--rl);color:var(--rd);border-color:#FECACA}

/* ── DRAWER ── */
.dov{position:fixed;inset:0;background:rgba(15,23,42,.38);z-index:150;display:flex;justify-content:flex-end;animation:ao .18s ease}
.drw{width:440px;height:100%;background:#fff;box-shadow:var(--s4);overflow-y:auto;animation:slide-in .22s ease}
@keyframes slide-in{from{transform:translateX(100%)}to{transform:translateX(0)}}
.drw::-webkit-scrollbar{width:3px}.drw::-webkit-scrollbar-thumb{background:var(--t4);border-radius:4px}
.dhdr{display:flex;align-items:center;justify-content:space-between;padding:20px;border-bottom:1px solid var(--bd);position:sticky;top:0;background:#fff;z-index:1}
.dbody{padding:22px}
.dr{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--bd)}
.dr:last-child{border-bottom:none}
.dk{font-size:12px;color:var(--t3);font-weight:500}
.dv{font-size:13px;font-weight:600;color:var(--t1);text-align:right}

/* ── OVERLAY PANEL (right-side pages from header) ── */
.ov-panel{position:fixed;inset:0;background:rgba(15,23,42,.4);z-index:100;display:flex;justify-content:flex-end;animation:ao .2s ease}
.ov-panel-inner{width:520px;height:100%;background:var(--wh);box-shadow:var(--s4);display:flex;flex-direction:column;overflow-y:auto;animation:slide-in .24s ease}
.ov-panel-inner.wide{width:700px}
.ov-panel-inner::-webkit-scrollbar{width:3px}.ov-panel-inner::-webkit-scrollbar-thumb{background:var(--t4);border-radius:4px}

/* ── TABS ── */
.tabs{display:flex;gap:4px;background:var(--bg);padding:4px;border-radius:var(--r2);width:fit-content;margin-bottom:20px}
.tab{padding:7px 16px;border-radius:var(--r3);font-size:12.5px;font-weight:500;cursor:pointer;transition:all .15s;color:var(--t2);font-family:inherit;border:none;background:none}
.tab.on{background:#fff;color:var(--p);font-weight:700;box-shadow:var(--s1)}
.tab:hover:not(.on){color:var(--t1)}

/* ── MISC ── */
.chip{font-size:10.5px;font-weight:600;padding:2px 8px;border-radius:4px;background:var(--pl);color:var(--p)}
.chip-g{background:var(--gl);color:var(--gd)}
.chip-y{background:var(--wl);color:var(--wd)}
.sav{width:32px;height:32px;border-radius:8px;background:var(--pm);color:var(--p);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}
.pw{background:var(--bd);border-radius:20px;height:6px;overflow:hidden}
.pf{height:100%;border-radius:20px;transition:width .5s ease}
.pb_{background:var(--p)}.pg_{background:var(--g)}.py_{background:var(--w)}.pr_{background:var(--r)}
.donut{width:116px;height:116px;border-radius:50%;background:conic-gradient(var(--g) 0% 42%,var(--p) 42% 72%,var(--w) 72% 88%,var(--r) 88% 100%);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.dhole{width:70px;height:70px;background:#fff;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center}
.dv_{font-size:17px;font-weight:800;color:var(--t1)}
.ds_{font-size:8.5px;color:var(--t3);font-weight:500}
.empty-s{text-align:center;padding:44px 20px}
.empty-s-ic{font-size:36px;margin-bottom:12px}
.empty-s-t{font-size:14px;font-weight:700;color:var(--t1);margin-bottom:5px}
.empty-s-st{font-size:12.5px;color:var(--t3)}
.crit-row td{background:#FFF5F5!important}
.low-row td{background:#FFFBF0!important}
.upload-zone{border:2px dashed var(--bd);border-radius:var(--r1);padding:36px 20px;text-align:center;cursor:pointer;transition:all .2s}
.upload-zone:hover{border-color:var(--p);background:var(--pl)}
.tog{width:40px;height:22px;border-radius:20px;position:relative;cursor:pointer;transition:background .2s;flex-shrink:0}
.tok{width:16px;height:16px;border-radius:50%;background:#fff;position:absolute;top:3px;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,.2)}
.toast-wrap{position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px}
.toast{background:var(--t1);color:#fff;padding:12px 18px;border-radius:var(--r2);font-size:13px;font-weight:500;box-shadow:var(--s3);display:flex;align-items:center;gap:8px;animation:toast-in .3s ease;min-width:240px}
.toast.suc{background:#065F46}.toast.err{background:#991B1B}
@keyframes toast-in{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
.confirm-body{text-align:center;padding:30px 24px 20px}
.confirm-ic{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.section-tag{font-size:10.5px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px}
.vf{display:flex;flex-direction:column;gap:3px;padding:12px 14px;background:var(--bg2);border-radius:var(--r3);border:1.5px solid var(--bd)}
.vf-l{font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.06em}
.vf-v{font-size:13.5px;font-weight:600;color:var(--t1)}
.notif-item{padding:14px 20px;border-bottom:1px solid var(--bd);display:flex;gap:13px;align-items:flex-start;cursor:pointer;transition:background .15s}
.notif-item:hover{background:var(--bg2)}
.notif-item.unread{background:#FAFCFF;border-left:3px solid var(--p)}
.notif-item.unread:hover{background:var(--pl)}
.notif-dot-ic{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.perm-row{display:flex;align-items:center;justify-content:space-between;padding:13px 0;border-bottom:1px solid var(--bd)}
.perm-row:last-child{border-bottom:none}
.template-card{background:var(--bg2);border:1.5px solid var(--bd);border-radius:var(--r2);padding:16px;cursor:pointer;transition:all .15s;position:relative}
.template-card:hover{border-color:var(--p);background:var(--pl);box-shadow:0 4px 12px rgba(37,99,235,.1)}
.template-card.selected{border-color:var(--p);background:var(--pl)}
.mini-stats{display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap}
.mini-s{flex:1;min-width:130px;background:var(--wh);border-radius:var(--r1);border:1px solid var(--bd);padding:14px 16px;box-shadow:var(--s1)}
.mini-v{font-size:22px;font-weight:800}
.mini-l{font-size:11.5px;color:var(--t3);margin-top:2px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.gall{grid-column:1/-1}
`;

/* ═══════════════════════ ICONS ═════════════════════════════════ */
const I = ({ n, s = 17, c = "currentColor" }) => {
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
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
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    chevR: <><polyline points="9 18 15 12 9 6"/></>,
    chevL: <><polyline points="15 18 9 12 15 6"/></>,
    trend: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    warn: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></>,
    file: <><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></>,
    sms: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    alert_ic: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    role: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/></>,
    template: <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></>,
    pref: <><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/><circle cx="2" cy="6" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="9" cy="18" r="1"/></>,
    camera: <><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></>,
    link: <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[n] || null}
    </svg>
  );
};

/* ═══════════════════════ SHARED ATOMS ══════════════════════════ */
const Bdg = ({ type, label }) => {
  const m = { green: "bdg-g", red: "bdg-r", yellow: "bdg-y", blue: "bdg-b", purple: "bdg-pu" };
  return <span className={`bdg ${m[type] || "bdg-b"}`}><span className="bdg-dot" />{label}</span>;
};

const SB = ({ value, onChange, placeholder = "Search…", style }) => (
  <div className="srch" style={style}>
    <I n="search" s={14} c="#94A3B8" />
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    {value && <span style={{ cursor: "pointer", color: "#94A3B8", fontSize: 11, flexShrink: 0 }} onClick={() => onChange("")}>✕</span>}
  </div>
);

const ConfirmDlg = ({ title, msg, onOk, onCancel, danger = true }) => (
  <div className="mov" onClick={onCancel}>
    <div className="mdl mdl-sm" onClick={e => e.stopPropagation()}>
      <div className="confirm-body">
        <div className="confirm-ic" style={{ background: danger ? "#FEF2F2" : "#EFF6FF" }}>
          <I n={danger ? "trash" : "info"} s={26} c={danger ? "#EF4444" : "#2563EB"} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.6 }}>{msg}</div>
      </div>
      <div className="mfoot">
        <button className="btn bg_" onClick={onCancel}>Cancel</button>
        <button className={`btn ${danger ? "bdn" : "bp"}`} onClick={onOk}>{danger ? "Yes, Delete" : "Confirm"}</button>
      </div>
    </div>
  </div>
);

const BC = ({ items, onBack }) => (
  <div className="bc">
    <span className="bc-back" onClick={onBack}><I n="chevL" s={14} />Back</span>
    {items.map((it, i) => (
      <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span className="bc-sep">›</span>
        <span className={i === items.length - 1 ? "bc-cur" : ""}>{it}</span>
      </span>
    ))}
  </div>
);

const UploadScreen = ({ title, cols, onBack, onSuccess }) => {
  const [step, setStep] = useState(1);
  return (
    <>
      <BC items={[title]} onBack={onBack} />
      <div className="card cp" style={{ maxWidth: 620 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>{title}</div>
        {step === 1 && (
          <>
            <div className="upload-zone" onClick={() => setStep(2)}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📊</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Drag & drop Excel / CSV file</div>
              <div style={{ fontSize: 12.5, color: "var(--t3)", marginBottom: 16 }}>Supports .xlsx, .xls, .csv — max 10 MB</div>
              <button className="btn bp" style={{ margin: "0 auto" }} onClick={e => { e.stopPropagation(); setStep(2); }}><I n="upload" s={14} c="#fff" /> Choose File</button>
            </div>
            <div style={{ marginTop: 18, padding: "14px 16px", background: "var(--bg2)", borderRadius: "var(--r2)", border: "1px solid var(--bd)" }}>
              <div style={{ fontWeight: 600, fontSize: 12.5, marginBottom: 8, display: "flex", gap: 6, alignItems: "center" }}><I n="file" s={14} c="var(--p)" /> Required Columns</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{cols.map(c => <span key={c} className="chip">{c}</span>)}</div>
              <button className="btn bg_ bsm" style={{ marginTop: 10 }}><I n="download" s={12} /> Download Template</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "var(--gl)", borderRadius: "var(--r3)", marginBottom: 20 }}>
              <I n="check" s={16} c="var(--gd)" /><span style={{ fontWeight: 600, color: "var(--gd)", fontSize: 13 }}>File ready: import_data.xlsx</span>
            </div>
            <div style={{ background: "var(--bg2)", borderRadius: "var(--r2)", border: "1px solid var(--bd)", overflow: "hidden", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 6, padding: "9px 14px", background: "var(--bd)" }}>
                {cols.map(c => <span key={c} style={{ flex: 1, fontSize: 10.5, fontWeight: 700, color: "var(--t2)", textTransform: "uppercase" }}>{c}</span>)}
              </div>
              {[0, 1].map(i => (
                <div key={i} style={{ display: "flex", gap: 6, padding: "9px 14px", borderTop: "1px solid var(--bd)" }}>
                  {cols.map((_, j) => <span key={j} style={{ flex: 1, fontSize: 11.5, color: "var(--t2)" }}>Sample {j + 1}</span>)}
                </div>
              ))}
              <div style={{ padding: "9px 14px", borderTop: "1px solid var(--bd)", fontSize: 12, color: "var(--t3)", textAlign: "center" }}>+ more rows…</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn bp" onClick={onSuccess}><I n="check" s={14} c="#fff" /> Import Now</button>
              <button className="btn bg_" onClick={() => setStep(1)}>Re-upload</button>
              <button className="btn bg_" onClick={onBack}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

/* ═══════════════════════ DATA ══════════════════════════════════ */
const EXAM_CATS = ["All", "Manthan", "Shabbas", "ICS"];

const INIT_SCHOOLS = [
  { id: 1, name: "Ryan International School", code: "RI", location: "Mumbai", district: "Thane", teachers: 34, status: "active", exams: ["Manthan", "ICS"], phone: "022-12345678", email: "admin@ryan.edu", principal: "Dr. Anita Roy" },
  { id: 2, name: "Podar International", code: "PI", location: "Pune", district: "Pune", teachers: 28, status: "active", exams: ["Shabbas", "Manthan"], phone: "020-98765432", email: "admin@podar.edu", principal: "Mr. Suresh Nair" },
  { id: 3, name: "Delhi Public School", code: "DP", location: "Delhi", district: "South Delhi", teachers: 26, status: "active", exams: ["ICS"], phone: "011-55443322", email: "admin@dps.edu", principal: "Mrs. Kavita Mehta" },
  { id: 4, name: "St. Mary's Convent", code: "SM", location: "Nagpur", district: "Nagpur", teachers: 22, status: "active", exams: ["Manthan", "Shabbas"], phone: "0712-33221100", email: "admin@stmarys.edu", principal: "Sr. Theresa" },
  { id: 5, name: "Kendriya Vidyalaya", code: "KV", location: "Nashik", district: "Nashik", teachers: 20, status: "active", exams: ["Shabbas"], phone: "0253-77665544", email: "admin@kv.edu", principal: "Mr. Rajesh Patil" },
  { id: 6, name: "Vidya Valley School", code: "VV", location: "Pune", district: "Pimpri", teachers: 18, status: "inactive", exams: ["ICS", "Manthan"], phone: "020-44332211", email: "admin@vidyavalley.edu", principal: "Mrs. Smita Joshi" },
  { id: 7, name: "Billabong High", code: "BH", location: "Mumbai", district: "Andheri", teachers: 16, status: "active", exams: ["Manthan"], phone: "022-99887766", email: "admin@billabong.edu", principal: "Dr. Anil Sharma" },
];
const INIT_STUDENTS = [
  { id: 1, name: "Aarav Shah", class: "9", div: "A", schoolId: 1, roll: "RI-901", status: "active", phone: "+91 9876543210", email: "aarav@gmail.com", dob: "2009-05-12", gender: "Male" },
  { id: 2, name: "Diya Mehta", class: "8", div: "B", schoolId: 2, roll: "PI-802", status: "active", phone: "+91 9765432109", email: "diya@gmail.com", dob: "2010-08-22", gender: "Female" },
  { id: 3, name: "Rohan Kulkarni", class: "10", div: "A", schoolId: 3, roll: "DP-1001", status: "active", phone: "+91 9654321098", email: "rohan@gmail.com", dob: "2008-03-17", gender: "Male" },
  { id: 4, name: "Ananya Iyer", class: "7", div: "C", schoolId: 1, roll: "RI-703", status: "active", phone: "+91 9543210987", email: "ananya@gmail.com", dob: "2011-11-05", gender: "Female" },
  { id: 5, name: "Kabir Singh", class: "9", div: "B", schoolId: 5, roll: "KV-902", status: "inactive", phone: "+91 9432109876", email: "kabir@gmail.com", dob: "2009-07-30", gender: "Male" },
  { id: 6, name: "Ishaan Verma", class: "10", div: "A", schoolId: 1, roll: "RI-1003", status: "active", phone: "+91 9321098765", email: "ishaan@gmail.com", dob: "2008-01-14", gender: "Male" },
  { id: 7, name: "Saanvi Reddy", class: "8", div: "A", schoolId: 7, roll: "BH-801", status: "active", phone: "+91 9210987654", email: "saanvi@gmail.com", dob: "2010-06-28", gender: "Female" },
  { id: 8, name: "Arjun Nair", class: "9", div: "C", schoolId: 6, roll: "VV-903", status: "active", phone: "+91 9109876543", email: "arjun@gmail.com", dob: "2009-09-10", gender: "Male" },
  { id: 9, name: "Meera Sharma", class: "7", div: "A", schoolId: 2, roll: "PI-701", status: "active", phone: "+91 9008765432", email: "meera@gmail.com", dob: "2011-04-03", gender: "Female" },
  { id: 10, name: "Laksh Patel", class: "10", div: "B", schoolId: 4, roll: "SM-1002", status: "active", phone: "+91 8987654321", email: "laksh@gmail.com", dob: "2008-12-19", gender: "Male" },
];
const INIT_TEACHERS = [
  { id: 1, name: "Priya Sharma", initials: "PS", mobile: "+91 98765 43210", subject: "Math", exams: 5, examNames: ["Manthan", "ICS"], school: "Ryan International School", schoolId: 1, status: "active", email: "priya.s@ryan.edu", studentCount: 92, booksPurchased: 50, experience: "8 Years", joined: "Jan 2019", address: "Mumbai, Maharashtra" },
  { id: 2, name: "Rahul Desai", initials: "RD", mobile: "+91 97654 32109", subject: "Science", exams: 3, examNames: ["Shabbas"], school: "Podar International", schoolId: 2, status: "active", email: "rahul.d@podar.edu", studentCount: 64, booksPurchased: 45, experience: "5 Years", joined: "Mar 2021", address: "Pune, Maharashtra" },
  { id: 3, name: "Sunita Patil", initials: "SP", mobile: "+91 96543 21098", subject: "English", exams: 4, examNames: ["Manthan", "Shabbas"], school: "Delhi Public School", schoolId: 3, status: "active", email: "sunita.p@dps.edu", studentCount: 78, booksPurchased: 60, experience: "11 Years", joined: "Jul 2017", address: "Delhi" },
  { id: 4, name: "Arun Kumar", initials: "AK", mobile: "+91 95432 10987", subject: "History", exams: 2, examNames: ["ICS"], school: "St. Mary's Convent", schoolId: 4, status: "inactive", email: "arun.k@stmarys.edu", studentCount: 44, booksPurchased: 40, experience: "4 Years", joined: "Sep 2022", address: "Nagpur, Maharashtra" },
  { id: 5, name: "Meena Joshi", initials: "MJ", mobile: "+91 94321 09876", subject: "Math", exams: 6, examNames: ["Shabbas", "Manthan", "ICS"], school: "Kendriya Vidyalaya", schoolId: 5, status: "active", email: "meena.j@kv.edu", studentCount: 112, booksPurchased: 55, experience: "13 Years", joined: "Jun 2015", address: "Nashik, Maharashtra" },
  { id: 6, name: "Vijay Nair", initials: "VN", mobile: "+91 93210 98765", subject: "Physics", exams: 3, examNames: ["Manthan"], school: "Billabong High", schoolId: 7, status: "active", email: "vijay.n@billabong.edu", studentCount: 56, booksPurchased: 35, experience: "6 Years", joined: "Feb 2020", address: "Mumbai, Maharashtra" },
  { id: 7, name: "Kavita Rao", initials: "KR", mobile: "+91 92109 87654", subject: "Biology", exams: 4, examNames: ["ICS", "Shabbas"], school: "Vidya Valley School", schoolId: 6, status: "active", email: "kavita.r@vidyavalley.edu", studentCount: 68, booksPurchased: 48, experience: "9 Years", joined: "Apr 2018", address: "Pune, Maharashtra" },
];
const INIT_EXAMS = [
  { id: 1, name: "State Level Olympiad 2025", type: "Olympiad", date: "2025-06-15", teacher: "Priya Sharma", students: 480, status: "upcoming", exam: "ICS", center: "Mumbai Central Hall", duration: 120, maxStudents: 500, description: "Annual state-level olympiad for Class 8–10 students." },
  { id: 2, name: "Science Aptitude Test", type: "Aptitude", date: "2025-06-10", teacher: "Rahul Desai", students: 320, status: "active", exam: "Shabbas", center: "Pune Exam Center A", duration: 90, maxStudents: 350, description: "Science aptitude evaluation for all classes." },
  { id: 3, name: "Mathematics Olympiad Q1", type: "Olympiad", date: "2025-05-28", teacher: "Meena Joshi", students: 560, status: "active", exam: "Manthan", center: "Nagpur Convention Hall", duration: 120, maxStudents: 600, description: "Q1 mathematics olympiad covering algebra and geometry." },
  { id: 4, name: "English Proficiency Test", type: "Proficiency", date: "2025-05-20", teacher: "Sunita Patil", students: 280, status: "completed", exam: "Manthan", center: "Delhi North Center", duration: 60, maxStudents: 300, description: "English language proficiency assessment." },
  { id: 5, name: "Annual Scholarship Exam", type: "Scholarship", date: "2025-05-01", teacher: "Vijay Nair", students: 640, status: "completed", exam: "Shabbas", center: "Nashik Exam Block", duration: 180, maxStudents: 700, description: "Annual scholarship exam for meritorious students." },
  { id: 6, name: "ICS Regional Finals", type: "Olympiad", date: "2025-04-12", teacher: "Kavita Rao", students: 390, status: "completed", exam: "ICS", center: "Thane Study Center", duration: 150, maxStudents: 400, description: "ICS regional-level finals competition." },
];
const INIT_CENTERS = [
  { id: 1, name: "Mumbai Central Hall", city: "Mumbai", state: "Maharashtra", address: "Dadar West, Mumbai 400028", capacity: 500, assigned: 498, contact: "022-24567890", incharge: "Mr. Suresh Patil" },
  { id: 2, name: "Pune Exam Center A", city: "Pune", state: "Maharashtra", address: "Shivajinagar, Pune 411005", capacity: 400, assigned: 320, contact: "020-25678901", incharge: "Mrs. Rekha Desai" },
  { id: 3, name: "Nagpur Convention Hall", city: "Nagpur", state: "Maharashtra", address: "Civil Lines, Nagpur 440001", capacity: 350, assigned: 290, contact: "0712-2456789", incharge: "Mr. Anil Bhosale" },
  { id: 4, name: "Delhi North Center", city: "Delhi", state: "Delhi", address: "Rohini Sector 3, Delhi 110085", capacity: 600, assigned: 598, contact: "011-27892345", incharge: "Mr. Deepak Sharma" },
  { id: 5, name: "Nashik Exam Block", city: "Nashik", state: "Maharashtra", address: "College Road, Nashik 422005", capacity: 250, assigned: 180, contact: "0253-2304567", incharge: "Mrs. Priya Kulkarni" },
  { id: 6, name: "Thane Study Center", city: "Thane", state: "Maharashtra", address: "Thane West, Thane 400601", capacity: 300, assigned: 300, contact: "022-25456789", incharge: "Mr. Vijay More" },
];
const INIT_FEES = [
  { id: 1, teacher: "Priya Sharma", school: "Ryan International School", total: 12000, paid: 12000, pending: 0, status: "paid" },
  { id: 2, teacher: "Rahul Desai", school: "Podar International", total: 10000, paid: 7500, pending: 2500, status: "partial" },
  { id: 3, teacher: "Sunita Patil", school: "Delhi Public School", total: 11000, paid: 0, pending: 11000, status: "pending" },
  { id: 4, teacher: "Arun Kumar", school: "St. Mary's Convent", total: 9500, paid: 9500, pending: 0, status: "paid" },
  { id: 5, teacher: "Meena Joshi", school: "Kendriya Vidyalaya", total: 13000, paid: 8000, pending: 5000, status: "partial" },
  { id: 6, teacher: "Vijay Nair", school: "Billabong High", total: 10500, paid: 10500, pending: 0, status: "paid" },
  { id: 7, teacher: "Kavita Rao", school: "Vidya Valley School", total: 9000, paid: 0, pending: 9000, status: "pending" },
];

const NAV_ITEMS = [
  { id: "dashboard", icon: "dashboard", label: "Dashboard" },
  { id: "schools", icon: "school", label: "Schools", badge: "7" },
  { id: "teachers", icon: "teacher", label: "Teachers" },
  { id: "students", icon: "student", label: "Students", badge: "10", blue: true },
  { id: "exams", icon: "exam", label: "Exams" },
  { id: "books", icon: "book", label: "Books" },
  { id: "fees", icon: "fees", label: "Fees" },
  { id: "centers", icon: "center", label: "Centers" },
  { id: "notifications", icon: "notif", label: "Notifications", badge: "5" },
  { id: "reports", icon: "report", label: "Reports" },
  { id: "settings", icon: "settings", label: "Settings" },
];
const PAGE_TITLES = { dashboard: "Dashboard", schools: "Schools", teachers: "Teachers", students: "Students", exams: "Exams", books: "Books", fees: "Fees", centers: "Centers", notifications: "Notifications", reports: "Reports", settings: "Settings" };

/* ═══════════════════════ APP ROOT ══════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [overlay, setOverlay] = useState(null); // "notif" | "settings" | "profile"
  const [toasts, setToasts] = useState([]);
  const [schools, setSchools] = useState(INIT_SCHOOLS);
  const [students, setStudents] = useState(INIT_STUDENTS);
  const [teachers, setTeachers] = useState(INIT_TEACHERS);
  const [exams, setExams] = useState(INIT_EXAMS);
  const [centers, setCenters] = useState(INIT_CENTERS);
  const [fees] = useState(INIT_FEES);
  const [booksData, setBooksData] = useState(INIT_TEACHERS.map(t => ({ id: t.id, teacher: t.name, school: t.school, schoolId: t.schoolId, purchased: t.booksPurchased, students: t.studentCount, status: t.booksPurchased < 40 ? "critical" : t.booksPurchased < 48 ? "low" : "ok" })));

  const scCounts = useMemo(() => { const c = {}; students.forEach(s => { c[s.schoolId] = (c[s.schoolId] || 0) + 1; }); return c; }, [students]);
  const schoolsWC = schools.map(s => ({ ...s, students: scCounts[s.id] || 0 }));

  const toast = useCallback((msg, type = "suc") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3200);
  }, []);

  const handleNav = useCallback((pg) => { setPage(pg); setOverlay(null); }, []);

  const sharedProps = { schools: schoolsWC, setSchools, students, setStudents, teachers, setTeachers, exams, setExams, centers, setCenters, fees, booksData, setBooksData, toast };

  return (
    <>
      <style>{css}</style>
      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sb">
          <div className="sb-brand">
            <div className="brand-logo"><I n="exam" s={18} c="#fff" /></div>
            <div><div className="brand-name">ExamPro</div><div className="brand-sub">Super Admin Panel</div></div>
          </div>
          <div className="sb-section">
            <div className="sb-label">Main Menu</div>
            {NAV_ITEMS.slice(0, 5).map(n => (
              <div key={n.id} className={`nav-item${page === n.id ? " active" : ""}`} onClick={() => handleNav(n.id)}>
                <span className="nav-ic"><I n={n.icon} s={16} /></span>{n.label}
                {n.badge && <span className={`nav-badge${n.blue ? " blue" : ""}`}>{n.badge}</span>}
              </div>
            ))}
          </div>
          <div className="sb-section">
            <div className="sb-label">Management</div>
            {NAV_ITEMS.slice(5, 9).map(n => (
              <div key={n.id} className={`nav-item${page === n.id ? " active" : ""}`} onClick={() => handleNav(n.id)}>
                <span className="nav-ic"><I n={n.icon} s={16} /></span>{n.label}
                {n.badge && <span className={`nav-badge${n.blue ? " blue" : ""}`}>{n.badge}</span>}
              </div>
            ))}
          </div>
          <div className="sb-section">
            <div className="sb-label">Analytics</div>
            {NAV_ITEMS.slice(9).map(n => (
              <div key={n.id} className={`nav-item${page === n.id ? " active" : ""}`} onClick={() => handleNav(n.id)}>
                <span className="nav-ic"><I n={n.icon} s={16} /></span>{n.label}
              </div>
            ))}
          </div>
          <div className="sb-footer">
            <div className="user-row" onClick={() => setOverlay("profile")}>
              <div className="av">SA</div>
              <div><div className="user-name">Super Admin</div><div className="user-role">admin@exampro.in</div></div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main">
          <header className="hdr">
            <div className="hdr-left">
              <div className="hdr-title">{PAGE_TITLES[page]}</div>
            </div>
            <div className="hdr-search">
              <I n="search" s={14} c="#94A3B8" />
              <input placeholder="Search students, schools, exams…" />
            </div>
            <div className="hdr-actions">
              <div className={`hbtn${overlay === "notif" ? " active" : ""}`} onClick={() => setOverlay(overlay === "notif" ? null : "notif")} title="Notifications">
                <I n="notif" s={16} />
                {overlay !== "notif" && <div className="hbtn-dot" />}
              </div>
              <div className={`hbtn${overlay === "settings" ? " active" : ""}`} onClick={() => setOverlay(overlay === "settings" ? null : "settings")} title="Settings">
                <I n="settings" s={16} />
              </div>
              <div className={`hdr-avatar${overlay === "profile" ? " active" : ""}`} onClick={() => setOverlay(overlay === "profile" ? null : "profile")} title="Profile">SA</div>
            </div>
          </header>
          <div className="cnt">
            {page === "dashboard" && <DashboardPage onNav={handleNav} schools={schoolsWC} exams={exams} />}
            {page === "schools" && <SchoolsPage {...sharedProps} />}
            {page === "teachers" && <TeachersPage {...sharedProps} />}
            {page === "students" && <StudentsPage {...sharedProps} />}
            {page === "exams" && <ExamsPage {...sharedProps} />}
            {page === "books" && <BooksPage {...sharedProps} />}
            {page === "fees" && <FeesPage {...sharedProps} />}
            {page === "centers" && <CentersPage {...sharedProps} />}
            {page === "notifications" && <NotificationsPage />}
            {page === "reports" && <ReportsPage schools={schoolsWC} exams={exams} />}
            {page === "settings" && <SettingsPageFull />}
          </div>
        </div>
      </div>

      {/* HEADER OVERLAYS */}
      {overlay === "notif" && <NotifPanel onClose={() => setOverlay(null)} onViewAll={() => { handleNav("notifications"); }} />}
      {overlay === "settings" && <SettingsPanel onClose={() => setOverlay(null)} onNav={handleNav} />}
      {overlay === "profile" && <ProfilePanel onClose={() => setOverlay(null)} toast={toast} />}

      {/* TOASTS */}
      <div className="toast-wrap">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <I n={t.type === "suc" ? "check" : "x"} s={14} c="#fff" />{t.msg}
          </div>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════ NOTIFICATION PANEL (overlay) ════════ */
function NotifPanel({ onClose, onViewAll }) {
  const notifications = [
    { id: 1, icon: "exam", bg: "#EFF6FF", ic: "#2563EB", title: "New Exam Published", msg: "State Level Olympiad 2025 has been published.", time: "2 min ago", unread: true },
    { id: 2, icon: "fees", bg: "#FEF2F2", ic: "#EF4444", title: "Pending Fee Alert", msg: "3 teachers have overdue fee payments.", time: "1 hour ago", unread: true },
    { id: 3, icon: "book", bg: "#FFFBEB", ic: "#F59E0B", title: "Low Book Stock", msg: "Vijay Nair has only 35 books remaining.", time: "3 hours ago", unread: true },
    { id: 4, icon: "student", bg: "#ECFDF5", ic: "#10B981", title: "New Students Enrolled", msg: "45 new students registered this week.", time: "Yesterday", unread: false },
    { id: 5, icon: "center", bg: "#F5F3FF", ic: "#7C3AED", title: "Center Capacity Warning", msg: "Mumbai Central Hall is at 99% capacity.", time: "2 days ago", unread: false },
    { id: 6, icon: "report", bg: "#EFF6FF", ic: "#2563EB", title: "Monthly Report Ready", msg: "May 2025 performance report is ready.", time: "3 days ago", unread: false },
  ];
  const [filter, setFilter] = useState("All");
  const shown = filter === "Unread" ? notifications.filter(n => n.unread) : notifications;

  return (
    <div className="ov-panel" onClick={onClose}>
      <div className="ov-panel-inner" onClick={e => e.stopPropagation()}>
        <div className="dhdr">
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Notifications</div>
            <div style={{ fontSize: 12, color: "var(--t3)", marginTop: 2 }}>You have {notifications.filter(n => n.unread).length} unread alerts</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn bg_ bsm">Mark all read</button>
            <button className="close-btn" onClick={onClose}><I n="x" s={14} /></button>
          </div>
        </div>
        <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--bd)", display: "flex", gap: 8 }}>
          {["All", "Unread", "Exams", "Fees"].map(f => (
            <button key={f} className={`pill${filter === f ? " on" : ""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {shown.map(n => (
            <div key={n.id} className={`notif-item${n.unread ? " unread" : ""}`}>
              <div className="notif-dot-ic" style={{ background: n.bg }}><I n={n.icon} s={17} c={n.ic} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "var(--t1)" }}>{n.title}</div>
                  {n.unread && <div style={{ width: 7, height: 7, background: "var(--p)", borderRadius: "50%", flexShrink: 0, marginTop: 4 }} />}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--t2)", marginTop: 2, lineHeight: 1.4 }}>{n.msg}</div>
                <div style={{ fontSize: 11, color: "var(--t3)", marginTop: 5 }}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 20px", borderTop: "1px solid var(--bd)" }}>
          <button className="btn bo" style={{ width: "100%", justifyContent: "center" }} onClick={onViewAll}>View All Notifications</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ SETTINGS PANEL (overlay) ══════════════ */
function SettingsPanel({ onClose, onNav }) {
  const [activeTab, setActiveTab] = useState("roles");
  const roles = [
    { name: "Super Admin", users: 1, perms: ["All access"] },
    { name: "Exam Manager", users: 3, perms: ["Exams", "Centers", "Reports"] },
    { name: "School Coordinator", users: 8, perms: ["Schools", "Teachers", "Students"] },
    { name: "Finance Officer", users: 2, perms: ["Fees", "Reports"] },
  ];
  const templates = [
    { name: "Olympiad Template", type: "Olympiad", duration: "120 min", questions: 80, selected: true },
    { name: "Scholarship Template", type: "Scholarship", duration: "180 min", questions: 100, selected: false },
    { name: "Aptitude Template", type: "Aptitude", duration: "90 min", questions: 60, selected: false },
    { name: "Proficiency Template", type: "Proficiency", duration: "60 min", questions: 50, selected: false },
  ];
  const [selTpl, setSelTpl] = useState(0);
  const [prefs, setPrefs] = useState({ emailNotif: true, smsNotif: true, autoReport: false, darkMode: false, twoFactor: true });

  return (
    <div className="ov-panel" onClick={onClose}>
      <div className="ov-panel-inner wide" onClick={e => e.stopPropagation()}>
        <div className="dhdr">
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Settings</div>
            <div style={{ fontSize: 12, color: "var(--t3)", marginTop: 2 }}>Roles, templates & system preferences</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn bp bsm" onClick={() => { onNav("settings"); }}>Full Settings</button>
            <button className="close-btn" onClick={onClose}><I n="x" s={14} /></button>
          </div>
        </div>
        <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--bd)" }}>
          <div className="tabs" style={{ marginBottom: 0 }}>
            {[{ id: "roles", icon: "role", label: "Roles & Permissions" }, { id: "templates", icon: "template", label: "Exam Templates" }, { id: "prefs", icon: "pref", label: "System Preferences" }].map(t => (
              <button key={t.id} className={`tab${activeTab === t.id ? " on" : ""}`} onClick={() => setActiveTab(t.id)}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><I n={t.icon} s={13} />{t.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {activeTab === "roles" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Role Management</div>
                <button className="btn bp bsm"><I n="plus" s={13} c="#fff" /> Add Role</button>
              </div>
              {roles.map((r, i) => (
                <div key={i} style={{ background: "var(--bg2)", border: "1.5px solid var(--bd)", borderRadius: "var(--r2)", padding: "14px 16px", marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, background: "var(--pl)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><I n="shield" s={17} c="var(--p)" /></div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13.5 }}>{r.name}</div>
                        <div style={{ fontSize: 11.5, color: "var(--t3)" }}>{r.users} user{r.users !== 1 ? "s" : ""}</div>
                      </div>
                    </div>
                    <button className="btn bg_ bsm"><I n="edit" s={12} /> Edit</button>
                  </div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {r.perms.map(p => <span key={p} className="chip" style={{ fontSize: 10 }}>{p}</span>)}
                  </div>
                </div>
              ))}
            </>
          )}
          {activeTab === "templates" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Exam Templates</div>
                <button className="btn bp bsm"><I n="plus" s={13} c="#fff" /> New Template</button>
              </div>
              <div className="g2">
                {templates.map((t, i) => (
                  <div key={i} className={`template-card${selTpl === i ? " selected" : ""}`} onClick={() => setSelTpl(i)}>
                    {selTpl === i && <div style={{ position: "absolute", top: 10, right: 10 }}><I n="check" s={14} c="var(--p)" /></div>}
                    <div style={{ width: 36, height: 36, background: selTpl === i ? "var(--pm)" : "var(--bg)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}><I n="template" s={17} c={selTpl === i ? "var(--p)" : "var(--t2)"} /></div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{t.name}</div>
                    <div style={{ fontSize: 11.5, color: "var(--t3)", marginBottom: 8 }}>{t.type} · {t.duration} · {t.questions} Qs</div>
                    <span className="chip" style={{ fontSize: 10 }}>{t.type}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {activeTab === "prefs" && (
            <>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>System Preferences</div>
              {[
                ["Email Notifications", "Receive alerts via email", "emailNotif"],
                ["SMS Notifications", "Get SMS for important updates", "smsNotif"],
                ["Auto-generate Reports", "Weekly auto-generated reports", "autoReport"],
                ["Dark Mode", "Use dark interface theme", "darkMode"],
                ["Two-factor Authentication", "Enhanced login security", "twoFactor"],
              ].map(([title, sub, key]) => (
                <div key={key} className="perm-row">
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{title}</div>
                    <div style={{ fontSize: 12, color: "var(--t3)" }}>{sub}</div>
                  </div>
                  <div className="tog" style={{ background: prefs[key] ? "var(--p)" : "var(--bd)" }} onClick={() => setPrefs(p => ({ ...p, [key]: !p[key] }))}>
                    <div className="tok" style={{ left: prefs[key] ? 21 : 3 }} />
                  </div>
                </div>
              ))}
              <button className="btn bp" style={{ marginTop: 20 }}><I n="check" s={14} c="#fff" /> Save Preferences</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ PROFILE PANEL (overlay) ═══════════════ */
function ProfilePanel({ onClose, toast }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "Rahul Mehta", email: "admin@exampro.in", phone: "+91 98765 00000", role: "Super Admin", org: "ExamPro Platform", city: "Mumbai, Maharashtra" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="ov-panel" onClick={onClose}>
      <div className="ov-panel-inner" onClick={e => e.stopPropagation()}>
        <div className="dhdr">
          <div><div style={{ fontWeight: 700, fontSize: 16 }}>My Profile</div><div style={{ fontSize: 12, color: "var(--t3)", marginTop: 2 }}>Admin account details</div></div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn bo bsm" onClick={() => setEditing(!editing)}><I n="edit" s={13} />{editing ? "Cancel" : "Edit"}</button>
            <button className="close-btn" onClick={onClose}><I n="x" s={14} /></button>
          </div>
        </div>
        <div style={{ padding: "24px 22px" }}>
          {/* Avatar */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 auto", boxShadow: "0 8px 24px rgba(37,99,235,.3)" }}>RA</div>
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, background: "var(--p)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "2px solid #fff" }}>
                <I n="camera" s={12} c="#fff" />
              </div>
            </div>
            <div style={{ fontWeight: 800, fontSize: 17, marginTop: 12 }}>{form.name}</div>
            <div style={{ fontSize: 12.5, color: "var(--t3)", marginTop: 3 }}>{form.role}</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }}>
              <Bdg type="green" label="Active" />
              <span className="chip"><I n="shield" s={10} /> Verified</span>
            </div>
          </div>

          {editing ? (
            <>
              <div style={{ fontWeight: 700, fontSize: 12.5, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 14 }}>Edit Information</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[["Full Name", "name", "text"], ["Email", "email", "email"], ["Phone", "phone", "tel"], ["City / Location", "city", "text"], ["Organisation", "org", "text"]].map(([label, key, type]) => (
                  <div className="fg" key={key}>
                    <label className="fl">{label}</label>
                    <input className="fi" type={type} value={form[key]} onChange={e => set(key, e.target.value)} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                <button className="btn bp" style={{ flex: 1 }} onClick={() => { setEditing(false); toast("Profile updated successfully!"); }}><I n="check" s={14} c="#fff" /> Save Changes</button>
                <button className="btn bg_" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontWeight: 700, fontSize: 12, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 14 }}>Contact Information</div>
              {[
                ["Full Name", form.name, "users"],
                ["Email Address", form.email, "mail"],
                ["Phone Number", form.phone, "phone"],
                ["Location", form.city, "center"],
                ["Organisation", form.org, "school"],
                ["Role", form.role, "shield"],
              ].map(([k, v, ic]) => (
                <div key={k} className="dr">
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <I n={ic} s={14} c="var(--t3)" />
                    <span className="dk">{k}</span>
                  </div>
                  <span className="dv">{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 20, padding: 16, background: "var(--bg2)", borderRadius: "var(--r2)", border: "1px solid var(--bd)" }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>Account Security</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn bg_" style={{ flex: 1, justifyContent: "center" }}><I n="lock" s={13} /> Change Password</button>
                  <button className="btn bg_" style={{ flex: 1, justifyContent: "center" }}><I n="shield" s={13} /> 2FA Settings</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ DASHBOARD ═════════════════════════════ */
function DashboardPage({ onNav, schools, exams }) {
  const [chartFilter, setChartFilter] = useState("All Time");

  const yearlyData = [
    { label: "ICS Regional", count: 390, color: "#2563EB" },
    { label: "English Prof.", count: 280, color: "#7C3AED" },
    { label: "Math Q1", count: 560, color: "#2563EB" },
    { label: "Annual Scholar.", count: 640, color: "#10B981" },
    { label: "Science Apt.", count: 320, color: "#F97316" },
    { label: "State Olympiad", count: 480, color: "#2563EB" },
  ];
  const allTimeData = [
    { label: "Olympiad 2023", count: 320, color: "#2563EB" },
    { label: "Manthan Q2", count: 410, color: "#10B981" },
    { label: "ICS 2023", count: 290, color: "#7C3AED" },
    { label: "Scholar. 2023", count: 580, color: "#F59E0B" },
    { label: "ICS Regional", count: 390, color: "#2563EB" },
    { label: "Math Q1", count: 560, color: "#2563EB" },
    { label: "Annual Scholar.", count: 640, color: "#10B981" },
    { label: "State Olympiad", count: 480, color: "#2563EB" },
  ];
  const chartData = chartFilter === "Yearly" ? yearlyData : allTimeData;
  // const maxCount = Math.max(...chartData.map(d => d.count));

  return (
    <>
      {/* KPI Cards */}
      <div className="stat-grid">
        {[
          { icon: "school", label: "Total Schools", val: String(schools.length), change: "+8", up: true, bg: "#EFF6FF", ic: "#2563EB" },
          { icon: "student", label: "Total Students", val: "12,480", change: "+12%", up: true, bg: "#ECFDF5", ic: "#10B981" },
          { icon: "exam", label: "Active Exams", val: String(exams.filter(e => e.status !== "completed").length), change: "+3", up: true, bg: "#FFF7ED", ic: "#F97316" },
          { icon: "fees", label: "Pending Fees", val: "₹4.2L", change: "-5%", up: false, bg: "#FEF2F2", ic: "#EF4444" },
        ].map(s => (
          <div className="stat-card" key={s.label} onClick={() => {}}>
            <div className="stat-top">
              <div className="stat-icon" style={{ background: s.bg }}><I n={s.icon} s={20} c={s.ic} /></div>
              <span className={`stat-badge ${s.up ? "up" : "dn"}`}>{s.up ? "↑" : "↓"} {s.change}</span>
            </div>
            <div className="stat-val">{s.val}</div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "Add School", icon: "school", bg: "#2563EB", c: "#fff", page: "schools" },
          { label: "Create Exam", icon: "exam", bg: "#ECFDF5", c: "#10B981", page: "exams" },
          { label: "Add Student", icon: "student", bg: "#EFF6FF", c: "#2563EB", page: "students" },
          { label: "Add Teacher", icon: "teacher", bg: "#FFF7ED", c: "#F97316", page: "teachers" },
          { label: "View Reports", icon: "report", bg: "#F5F3FF", c: "#7C3AED", page: "reports" },
        ].map(b => (
          <button key={b.label} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: "var(--r3)", background: b.bg, color: b.c, fontSize: 12.5, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "inherit", transition: "all .15s" }} onClick={() => onNav(b.page)}>
            <I n={b.icon} s={14} c={b.c} />{b.label}
          </button>
        ))}
      </div>

      {/* Charts Row */}
      <div className="chart-grid">
        {/* Exam Performance Trend Chart */}
        <div className="card cp">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Exam Performance Trend</div>
              <div style={{ fontSize: 12, color: "var(--t3)", marginTop: 2 }}>Student participation count per exam</div>
            </div>
            <div style={{ display: "flex", gap: 5, background: "var(--bg)", padding: "3px", borderRadius: "var(--r2)" }}>
              {["Yearly", "All Time"].map(f => (
                <button key={f} style={{ padding: "6px 14px", borderRadius: "var(--r3)", fontFamily: "inherit", fontSize: 12, fontWeight: chartFilter === f ? 700 : 500, cursor: "pointer", border: "none", background: chartFilter === f ? "#fff" : "transparent", color: chartFilter === f ? "var(--p)" : "var(--t2)", boxShadow: chartFilter === f ? "var(--s1)" : "none", transition: "all .15s" }} onClick={() => setChartFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            {/* Y-axis */}
            <div style={{ display: "flex", flexDirection: "column-reverse", justifyContent: "space-between", paddingBottom: 28, paddingRight: 8, width: 38 }}>
              {[0, 200, 400, 600, 800].map(t => <span key={t} style={{ fontSize: 9, color: "var(--t3)", fontWeight: 600, textAlign: "right" }}>{t >= 1000 ? `${t / 1000}k` : t}</span>)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ position: "relative", height: 160, borderLeft: "1.5px solid var(--bd)", borderBottom: "1.5px solid var(--bd)" }}>
                {[200, 400, 600, 800].map(t => <div key={t} style={{ position: "absolute", left: 0, right: 0, bottom: `${(t / 800) * 100}%`, borderTop: "1px dashed #E9EEF5" }} />)}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: "100%", padding: "0 10px" }}>
                  {chartData.map((d, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: d.color, marginBottom: 3 }}>{d.count}</div>
                      <div
                        title={`${d.label}: ${d.count} students`}
                        style={{ width: "100%", height: `${(d.count / 800) * 100}%`, background: d.color, borderRadius: "4px 4px 0 0", opacity: .88, minHeight: 4, transition: "height .4s ease, background .3s", cursor: "pointer" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, padding: "6px 10px 0" }}>
                {chartData.map((d, i) => <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 8.5, color: "var(--t3)", fontWeight: 500, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis" }}>{d.label}</div>)}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
            {[{ c: "#2563EB", l: "Olympiad" }, { c: "#10B981", l: "Scholarship" }, { c: "#7C3AED", l: "Aptitude" }, { c: "#F97316", l: "Proficiency" }].map(lg => (
              <div key={lg.l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 9, height: 9, borderRadius: 3, background: lg.c }} /><span style={{ fontSize: 11.5, color: "var(--t2)" }}>{lg.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fees Donut */}
        <div className="card cp">
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>Fees Collection</div>
          <div style={{ fontSize: 12, color: "var(--t3)", marginBottom: 18 }}>Overall status this term</div>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div className="donut"><div className="dhole"><div className="dv_">78%</div><div className="ds_">Collected</div></div></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[{ l: "Paid", v: "₹8.2L", c: "#10B981" }, { l: "Processing", v: "₹1.8L", c: "#2563EB" }, { l: "Overdue", v: "₹0.9L", c: "#F59E0B" }, { l: "Defaulted", v: "₹0.4L", c: "#EF4444" }].map(x => (
                <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 9, height: 9, borderRadius: 2, background: x.c, flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, color: "var(--t2)", flex: 1 }}>{x.l}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--t1)" }}>{x.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Schools */}
      <div className="card cp">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Top Schools by Students</div>
          <button className="btn bg_ bsm" onClick={() => onNav("schools")}>View All</button>
        </div>
        <div className="g2" style={{ gap: "0 28px" }}>
          {schools.slice(0, 6).map((s, i) => (
            <div key={i} style={{ marginBottom: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600 }}>{s.name}</span>
                <span style={{ fontSize: 11.5, color: "var(--t3)" }}>{s.students}</span>
              </div>
              <div className="pw"><div className="pf pb_" style={{ width: `${Math.max(15, (s.students / 15) * 100)}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════ SCHOOLS PAGE ══════════════════════════ */
function SchoolsPage({ schools, setSchools, students, setStudents, toast }) {
  const [sub, setSub] = useState("list");
  const [sel, setSel] = useState(null);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const [q, setQ] = useState("");
  const [ef, setEf] = useState("All");
  const [sf, setSf] = useState("All");

  const filtered = useMemo(() => schools.filter(s => {
    const mQ = [s.name, s.location, s.district].join(" ").toLowerCase().includes(q.toLowerCase());
    const mE = ef === "All" || s.exams.includes(ef);
    const mS = sf === "All" || s.status === sf.toLowerCase();
    return mQ && mE && mS;
  }), [schools, q, ef, sf]);

  const doDelete = () => { setSchools(p => p.filter(s => s.id !== del.id)); toast(`"${del.name}" deleted`); setDel(null); };
  const doSave = (data) => {
    if (edit) { setSchools(p => p.map(s => s.id === edit.id ? { ...s, ...data } : s)); toast("School updated!"); }
    else { setSchools(p => [...p, { ...data, id: Date.now(), students: 0, exams: [] }]); toast("School added!"); }
    setSub("list"); setEdit(null);
  };

  if (sub === "add") return <SchoolForm title="Add New School" onSave={doSave} onBack={() => setSub("list")} />;
  if (sub === "edit" && edit) return <SchoolForm title="Edit School" initial={edit} onSave={doSave} onBack={() => { setSub("list"); setEdit(null); }} />;
  if (sub === "students" && sel) return <SchoolStudents school={sel} students={students} onBack={() => { setSub("list"); setSel(null); }} />;
  if (sub === "upload") return <UploadScreen title="Upload Schools" cols={["School Name", "Location", "District", "Principal", "Phone", "Email", "Status"]} onBack={() => setSub("list")} onSuccess={() => { setSub("list"); toast("Schools imported!"); }} />;

  return (
    <>
      <div className="ph"><div className="ph-title">Schools Management</div><div className="ph-sub">Click a school row to view enrolled students</div></div>
      <div className="tb">
        <SB value={q} onChange={setQ} placeholder="Search school, location…" />
        <select className="sel" value={sf} onChange={e => setSf(e.target.value)}><option>All</option><option>Active</option><option>Inactive</option></select>
        <button className="btn bp" onClick={() => setSub("add")}><I n="plus" s={14} c="#fff" /> Add School</button>
        <button className="btn bo" onClick={() => setSub("upload")}><I n="upload" s={14} c="var(--p)" /> Upload Excel</button>
        <button className="btn bg_" style={{ marginLeft: "auto" }} onClick={() => toast("Export started!", "suc")}><I n="download" s={13} /> Export</button>
      </div>
      <div className="pills" style={{ marginBottom: 14 }}>
        {EXAM_CATS.map(e => <button key={e} className={`pill${ef === e ? " on" : ""}`} onClick={() => setEf(e)}>{e}</button>)}
        <span style={{ fontSize: 12, color: "var(--t3)", alignSelf: "center", marginLeft: 6 }}>{filtered.length} schools</span>
      </div>
      <div className="card">
        <div className="tw">
          <table>
            <thead><tr><th>School Name</th><th>Location</th><th>District</th><th>Students</th><th>Teachers</th><th>Exams</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.length === 0 ? <tr><td colSpan={8}><div className="empty-s"><div className="empty-s-ic">🏫</div><div className="empty-s-t">No schools match</div></div></td></tr>
                : filtered.map(s => (
                  <tr key={s.id} style={{ cursor: "pointer" }} onClick={() => { setSel(s); setSub("students"); }}>
                    <td><div style={{ display: "flex", alignItems: "center", gap: 9 }}><div className="sav">{s.code}</div><span className="tdb" style={{ color: "var(--p)" }}>{s.name}</span></div></td>
                    <td className="td2">{s.location}</td><td className="td2">{s.district}</td>
                    <td><span style={{ fontWeight: 600 }}>{s.students}</span></td><td className="td2">{s.teachers}</td>
                    <td><div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>{s.exams.map(e => <span key={e} className="chip" style={{ fontSize: 9.5 }}>{e}</span>)}</div></td>
                    <td><Bdg type={s.status === "active" ? "green" : "yellow"} label={s.status === "active" ? "Active" : "Inactive"} /></td>
                    <td onClick={e => e.stopPropagation()}>
                      <div className="row-acts">
                        <button className="btn bg_ bsm" onClick={() => { setSel(s); setSub("students"); }} title="Students"><I n="users" s={12} /></button>
                        <button className="btn bg_ bsm" onClick={() => { setEdit(s); setSub("edit"); }}><I n="edit" s={12} /></button>
                        <button className="btn bdn bsm" onClick={() => setDel(s)}><I n="trash" s={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {del && <ConfirmDlg title="Delete School" msg={`Delete "${del.name}"? This cannot be undone.`} onOk={doDelete} onCancel={() => setDel(null)} />}
    </>
  );
}
function SchoolForm({ title, initial, onSave, onBack }) {
  const [f, setF] = useState({ name: initial?.name || "", code: initial?.code || "", location: initial?.location || "", district: initial?.district || "", principal: initial?.principal || "", phone: initial?.phone || "", email: initial?.email || "", teachers: initial?.teachers || "", status: initial?.status || "active" });
  const s = (k, v) => setF(p => ({ ...p, [k]: v }));
  return (<>
    <BC items={["Schools", title]} onBack={onBack} />
    <div className="card cp" style={{ maxWidth: 680 }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 18 }}>{title}</div>
      <div className="fgrid">
        <div className="fg"><label className="fl">School Name *</label><input className="fi" value={f.name} onChange={e => s("name", e.target.value)} placeholder="e.g. Ryan International School" /></div>
        <div className="fg"><label className="fl">Code</label><input className="fi" value={f.code} onChange={e => s("code", e.target.value.toUpperCase())} placeholder="e.g. RI" maxLength={4} /></div>
        <div className="fg"><label className="fl">City *</label><input className="fi" value={f.location} onChange={e => s("location", e.target.value)} placeholder="e.g. Mumbai" /></div>
        <div className="fg"><label className="fl">District</label><input className="fi" value={f.district} onChange={e => s("district", e.target.value)} placeholder="e.g. Thane" /></div>
        <div className="fg"><label className="fl">Principal</label><input className="fi" value={f.principal} onChange={e => s("principal", e.target.value)} placeholder="Dr. Anita Roy" /></div>
        <div className="fg"><label className="fl">Phone</label><input className="fi" value={f.phone} onChange={e => s("phone", e.target.value)} /></div>
        <div className="fg"><label className="fl">Email</label><input className="fi" value={f.email} onChange={e => s("email", e.target.value)} /></div>
        <div className="fg"><label className="fl">Total Teachers</label><input className="fi" type="number" value={f.teachers} onChange={e => s("teachers", e.target.value)} /></div>
        <div className="fg"><label className="fl">Status</label><select className="fi" value={f.status} onChange={e => s("status", e.target.value)}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button className="btn bp" onClick={() => onSave(f)}><I n="check" s={14} c="#fff" /> {initial ? "Update" : "Add School"}</button>
        <button className="btn bg_" onClick={onBack}>Cancel</button>
      </div>
    </div>
  </>);
}
function SchoolStudents({ school, students, onBack }) {
  const [q, setQ] = useState("");
  const list = students.filter(s => s.schoolId === school.id);
  const filtered = list.filter(s => [s.name, s.roll].join(" ").toLowerCase().includes(q.toLowerCase()));
  return (<>
    <BC items={["Schools", school.name + " — Students"]} onBack={onBack} />
    <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
      {[["Total", list.length, "#EFF6FF", "#2563EB"], ["Active", list.filter(s => s.status === "active").length, "#ECFDF5", "#10B981"], ["Dropped", list.filter(s => s.status !== "active").length, "#FEF2F2", "#EF4444"]].map(([l, v, bg, c]) => (
        <div key={l} style={{ background: bg, borderRadius: "var(--r1)", padding: "12px 16px", border: `1px solid ${bg}` }}><div style={{ fontSize: 20, fontWeight: 800, color: c }}>{v}</div><div style={{ fontSize: 11.5, color: "var(--t3)", marginTop: 2 }}>{l}</div></div>
      ))}
    </div>
    <div className="tb"><SB value={q} onChange={setQ} placeholder="Search students…" /></div>
    <div className="card">
      <div className="tw"><table>
        <thead><tr><th>Name</th><th>Roll No.</th><th>Class</th><th>Division</th><th>Status</th></tr></thead>
        <tbody>
          {filtered.length === 0 ? <tr><td colSpan={5}><div className="empty-s"><div className="empty-s-ic">🎓</div><div className="empty-s-t">No students</div></div></td></tr>
            : filtered.map((s, i) => (
              <tr key={s.id}><td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div className="av" style={{ width: 27, height: 27, fontSize: 10, background: `hsl(${i * 55 + 190},58%,52%)` }}>{s.name[0]}</div><span className="tdb">{s.name}</span></div></td><td className="td2">{s.roll}</td><td><Bdg type="blue" label={`Class ${s.class}`} /></td><td className="td2">Div {s.div}</td><td><Bdg type={s.status === "active" ? "green" : "yellow"} label={s.status === "active" ? "Enrolled" : "Dropped"} /></td></tr>
            ))}
        </tbody>
      </table></div>
    </div>
  </>);
}

/* ═══════════════════════ TEACHERS PAGE ═════════════════════════ */
function TeachersPage({ teachers, setTeachers, schools, toast }) {
  const [sub, setSub] = useState("list");
  const [view, setView] = useState(null);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const [q, setQ] = useState(""); const [ef, setEf] = useState("All"); const [sf, setSf] = useState("All"); const [subj, setSubj] = useState("All");

  const subjects = ["All", ...new Set(teachers.map(t => t.subject))];
  const filtered = useMemo(() => teachers.filter(t => {
    const mQ = [t.name, t.mobile, t.school, t.subject].join(" ").toLowerCase().includes(q.toLowerCase());
    return mQ && (subj === "All" || t.subject === subj) && (ef === "All" || t.examNames.includes(ef)) && (sf === "All" || t.status === sf.toLowerCase());
  }), [teachers, q, subj, ef, sf]);

  const doDelete = () => { setTeachers(p => p.filter(t => t.id !== del.id)); toast("Teacher removed"); setDel(null); };
  const doSave = (data) => {
    if (edit) { setTeachers(p => p.map(t => t.id === edit.id ? { ...t, ...data } : t)); toast("Teacher updated!"); }
    else { const ini = (data.name || "??").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(); setTeachers(p => [...p, { ...data, id: Date.now(), initials: ini, exams: 0, examNames: [], studentCount: 0, booksPurchased: 0 }]); toast("Teacher added!"); }
    setSub("list"); setEdit(null);
  };

  if (sub === "add") return <TeacherForm title="Add Teacher" schools={schools} onSave={doSave} onBack={() => setSub("list")} />;
  if (sub === "edit" && edit) return <TeacherForm title="Edit Teacher" initial={edit} schools={schools} onSave={doSave} onBack={() => { setSub("list"); setEdit(null); }} />;
  if (sub === "view" && view) return <TeacherView teacher={view} onBack={() => { setSub("list"); setView(null); }} onEdit={t => { setEdit(t); setSub("edit"); }} />;
  if (sub === "upload") return <UploadScreen title="Bulk Import Teachers" cols={["Name", "Mobile", "Email", "Subject", "School", "Status"]} onBack={() => setSub("list")} onSuccess={() => { setSub("list"); toast("Teachers imported!"); }} />;

  return (<>
    <div className="ph"><div className="ph-title">Teachers Management</div><div className="ph-sub">Manage all registered teachers and exam assignments</div></div>
    <div className="tb">
      <SB value={q} onChange={setQ} placeholder="Search teachers, school…" />
      <select className="sel" value={subj} onChange={e => setSubj(e.target.value)}>{subjects.map(s => <option key={s}>{s}</option>)}</select>
      <select className="sel" value={sf} onChange={e => setSf(e.target.value)}><option>All</option><option>Active</option><option>Inactive</option></select>
      <button className="btn bp" onClick={() => setSub("add")}><I n="plus" s={14} c="#fff" /> Add Teacher</button>
      <button className="btn bo" onClick={() => setSub("upload")}><I n="upload" s={14} c="var(--p)" /> Bulk Import</button>
      <button className="btn bg_" style={{ marginLeft: "auto" }} onClick={() => toast("Export started!", "suc")}><I n="download" s={13} /> Export</button>
    </div>
    <div className="pills" style={{ marginBottom: 14 }}>
      {EXAM_CATS.map(e => <button key={e} className={`pill${ef === e ? " on" : ""}`} onClick={() => setEf(e)}>{e}</button>)}
      <span style={{ fontSize: 12, color: "var(--t3)", alignSelf: "center", marginLeft: 6 }}>{filtered.length} teachers</span>
    </div>
    <div className="card">
      <div className="tw"><table>
        <thead><tr><th>Teacher Name</th><th>Mobile</th><th>Subject</th><th>Students</th><th>Exams</th><th>School</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {filtered.length === 0 ? <tr><td colSpan={8}><div className="empty-s"><div className="empty-s-ic">👩‍🏫</div><div className="empty-s-t">No teachers found</div></div></td></tr>
            : filtered.map(t => (
              <tr key={t.id}>
                <td><div style={{ display: "flex", alignItems: "center", gap: 9 }}><div className="av" style={{ width: 30, height: 30, fontSize: 11 }}>{t.initials}</div><span className="tdb">{t.name}</span></div></td>
                <td className="td2">{t.mobile}</td><td className="td2">{t.subject}</td>
                <td><div style={{ display: "flex", alignItems: "center", gap: 5 }}><I n="student" s={12} c="var(--p)" /><span style={{ fontWeight: 700, color: "var(--p)" }}>{t.studentCount}</span></div></td>
                <td><div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>{t.examNames.map(e => <span key={e} className="chip" style={{ fontSize: 9.5 }}>{e}</span>)}</div></td>
                <td className="td2">{t.school}</td>
                <td><Bdg type={t.status === "active" ? "green" : "yellow"} label={t.status === "active" ? "Active" : "Inactive"} /></td>
                <td><div className="row-acts">
                  <button className="btn bp bsm" onClick={() => { setView(t); setSub("view"); }}><I n="eye" s={12} c="#fff" /> View</button>
                  <button className="btn bg_ bsm" onClick={() => { setEdit(t); setSub("edit"); }}><I n="edit" s={12} /></button>
                  <button className="btn bdn bsm" onClick={() => setDel(t)}><I n="trash" s={12} /></button>
                </div></td>
              </tr>
            ))}
        </tbody>
      </table></div>
    </div>
    {del && <ConfirmDlg title="Remove Teacher" msg={`Remove "${del.name}"?`} onOk={doDelete} onCancel={() => setDel(null)} />}
  </>);
}
function TeacherView({ teacher, onBack, onEdit }) {
  return (<>
    <BC items={["Teachers", teacher.name]} onBack={onBack} />
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div style={{ flex: "0 0 290px" }}>
        <div className="card cp" style={{ textAlign: "center", marginBottom: 14 }}>
          <div className="av" style={{ width: 64, height: 64, margin: "0 auto 12px", fontSize: 22 }}>{teacher.initials}</div>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{teacher.name}</div>
          <div style={{ fontSize: 12.5, color: "var(--t3)", marginTop: 3 }}>{teacher.subject} Teacher</div>
          <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 10, flexWrap: "wrap" }}>{teacher.examNames.map(e => <span key={e} className="chip">{e}</span>)}</div>
          <Bdg type={teacher.status === "active" ? "green" : "yellow"} label={teacher.status === "active" ? "Active" : "Inactive"} />
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="btn bp" style={{ flex: 1 }} onClick={() => onEdit(teacher)}><I n="edit" s={13} c="#fff" /> Edit</button>
            <button className="btn bg_" style={{ flex: 1 }}><I n="sms" s={13} /> Message</button>
          </div>
        </div>
        <div className="card cp">
          <div className="section-tag">Performance Stats</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[{ l: "Students", v: teacher.studentCount, ic: "student", c: "#2563EB", bg: "#EFF6FF" }, { l: "Books", v: teacher.booksPurchased, ic: "book", c: "#10B981", bg: "#ECFDF5" }, { l: "Exams", v: teacher.exams, ic: "exam", c: "#F97316", bg: "#FFF7ED" }].map(s => (
              <div key={s.l} style={{ background: s.bg, borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
                <I n={s.ic} s={16} c={s.c} /><div style={{ fontSize: 18, fontWeight: 800, color: s.c, marginTop: 4 }}>{s.v}</div><div style={{ fontSize: 10, color: "var(--t3)", marginTop: 1 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 260 }}>
        <div className="card cp">
          <div className="section-tag">Contact Details</div>
          <div className="fgrid" style={{ gap: 10 }}>
            {[["Mobile", teacher.mobile, "phone"], ["Email", teacher.email, "mail"], ["School", teacher.school, "school"], ["Subject", teacher.subject, "book"], ["Experience", teacher.experience || "—", "trend"], ["Joined", teacher.joined || "—", "calendar"]].map(([k, v, ic]) => (
              <div key={k} className="vf"><div className="vf-l">{k}</div><div className="vf-v" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}><I n={ic} s={12} c="var(--p)" />{v}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>);
}
function TeacherForm({ title, initial, schools, onSave, onBack }) {
  const [f, setF] = useState({ name: initial?.name || "", mobile: initial?.mobile || "", email: initial?.email || "", subject: initial?.subject || "", school: initial?.school || "", schoolId: initial?.schoolId || "", status: initial?.status || "active", experience: initial?.experience || "", address: initial?.address || "" });
  const s = (k, v) => setF(p => ({ ...p, [k]: v }));
  return (<>
    <BC items={["Teachers", title]} onBack={onBack} />
    <div className="card cp" style={{ maxWidth: 660 }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 18 }}>{title}</div>
      <div className="fgrid">
        <div className="fg"><label className="fl">Full Name *</label><input className="fi" value={f.name} onChange={e => s("name", e.target.value)} /></div>
        <div className="fg"><label className="fl">Mobile *</label><input className="fi" value={f.mobile} onChange={e => s("mobile", e.target.value)} /></div>
        <div className="fg"><label className="fl">Email</label><input className="fi" value={f.email} onChange={e => s("email", e.target.value)} /></div>
        <div className="fg"><label className="fl">Subject *</label><select className="fi" value={f.subject} onChange={e => s("subject", e.target.value)}><option value="">Select…</option>{["Math", "Science", "English", "History", "Physics", "Biology"].map(x => <option key={x}>{x}</option>)}</select></div>
        <div className="fg"><label className="fl">School *</label><select className="fi" value={f.schoolId} onChange={e => { const sc = schools.find(x => x.id === Number(e.target.value)); s("schoolId", Number(e.target.value)); s("school", sc?.name || ""); }}><option value="">Select…</option>{schools.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select></div>
        <div className="fg"><label className="fl">Experience</label><input className="fi" value={f.experience} onChange={e => s("experience", e.target.value)} placeholder="e.g. 5 Years" /></div>
        <div className="fg"><label className="fl">Status</label><select className="fi" value={f.status} onChange={e => s("status", e.target.value)}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
        <div className="fg fgall"><label className="fl">Address</label><input className="fi" value={f.address} onChange={e => s("address", e.target.value)} /></div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button className="btn bp" onClick={() => onSave(f)}><I n="check" s={14} c="#fff" /> {initial ? "Update" : "Add Teacher"}</button>
        <button className="btn bg_" onClick={onBack}>Cancel</button>
      </div>
    </div>
  </>);
}

/* ═══════════════════════ STUDENTS PAGE ═════════════════════════ */
function StudentsPage({ students, setStudents, schools, toast }) {
  const [sub, setSub] = useState("list");
  const [view, setView] = useState(null); const [edit, setEdit] = useState(null); const [del, setDel] = useState(null);
  const [q, setQ] = useState(""); const [scf, setScf] = useState("All Schools"); const [clf, setClf] = useState("All"); const [stf, setStf] = useState("All");

  const filtered = useMemo(() => students.filter(s => {
    const sc = schools.find(x => x.id === s.schoolId);
    const mQ = [s.name, s.roll, sc?.name || ""].join(" ").toLowerCase().includes(q.toLowerCase());
    return mQ && (scf === "All Schools" || sc?.name === scf) && (clf === "All" || `Class ${s.class}` === clf) && (stf === "All" || s.status === stf.toLowerCase());
  }), [students, q, scf, clf, stf, schools]);

  const doDelete = () => { setStudents(p => p.filter(s => s.id !== del.id)); toast("Student removed"); setDel(null); };
  const doSave = (data) => {
    if (edit) { setStudents(p => p.map(s => s.id === edit.id ? { ...s, ...data } : s)); toast("Student updated!"); }
    else { setStudents(p => [...p, { ...data, id: Date.now() }]); toast("Student added!"); }
    setSub("list"); setEdit(null);
  };

  if (sub === "add") return <StudentForm title="Add Student" schools={schools} onSave={doSave} onBack={() => setSub("list")} />;
  if (sub === "edit" && edit) return <StudentForm title="Edit Student" initial={edit} schools={schools} onSave={doSave} onBack={() => { setSub("list"); setEdit(null); }} />;
  if (sub === "view" && view) { const sc = schools.find(x => x.id === view.schoolId); return <StudentView student={view} school={sc} onBack={() => { setSub("list"); setView(null); }} onEdit={s => { setEdit(s); setSub("edit"); }} />; }
  if (sub === "upload") return <UploadScreen title="Upload Students" cols={["Name", "Roll No", "Class", "Division", "School", "Gender", "Phone", "Email"]} onBack={() => setSub("list")} onSuccess={() => { setSub("list"); toast("Students imported!"); }} />;

  return (<>
    <div className="ph"><div className="ph-title">Students Management</div></div>
    <div className="tb">
      <SB value={q} onChange={setQ} placeholder="Search students, roll no…" />
      <select className="sel" value={scf} onChange={e => setScf(e.target.value)}><option>All Schools</option>{schools.map(s => <option key={s.id}>{s.name}</option>)}</select>
      <select className="sel" value={clf} onChange={e => setClf(e.target.value)}><option>All</option>{["7", "8", "9", "10"].map(c => <option key={c}>Class {c}</option>)}</select>
      <select className="sel" value={stf} onChange={e => setStf(e.target.value)}><option>All</option><option>Active</option><option>Inactive</option></select>
      <button className="btn bp" onClick={() => setSub("add")}><I n="plus" s={14} c="#fff" /> Add Student</button>
      <button className="btn bo" onClick={() => setSub("upload")}><I n="upload" s={14} c="var(--p)" /> Upload Excel</button>
      <button className="btn bg_" style={{ marginLeft: "auto" }} onClick={() => toast("Export started!", "suc")}><I n="download" s={13} /> Export</button>
    </div>
    <div style={{ marginBottom: 12, fontSize: 12, color: "var(--t3)" }}>{filtered.length} students found</div>
    <div className="card">
      <div className="tw"><table>
        <thead><tr><th>Student Name</th><th>Roll No.</th><th>Class</th><th>Division</th><th>School</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {filtered.length === 0 ? <tr><td colSpan={7}><div className="empty-s"><div className="empty-s-ic">🎓</div><div className="empty-s-t">No students found</div></div></td></tr>
            : filtered.map((s, i) => { const sc = schools.find(x => x.id === s.schoolId); return (
              <tr key={s.id}>
                <td><div style={{ display: "flex", alignItems: "center", gap: 9 }}><div className="av" style={{ width: 28, height: 28, fontSize: 10, background: `hsl(${i * 55 + 190},58%,52%)` }}>{s.name[0]}</div><span className="tdb">{s.name}</span></div></td>
                <td className="td2">{s.roll}</td><td><Bdg type="blue" label={`Class ${s.class}`} /></td><td className="td2">Div {s.div}</td><td className="td2">{sc?.name || "—"}</td>
                <td><Bdg type={s.status === "active" ? "green" : "yellow"} label={s.status === "active" ? "Enrolled" : "Dropped"} /></td>
                <td><div className="row-acts">
                  <button className="btn bg_ bsm" onClick={() => { setView(s); setSub("view"); }}><I n="eye" s={12} /></button>
                  <button className="btn bg_ bsm" onClick={() => { setEdit(s); setSub("edit"); }}><I n="edit" s={12} /></button>
                  <button className="btn bdn bsm" onClick={() => setDel(s)}><I n="trash" s={12} /></button>
                </div></td>
              </tr>
            ); })}
        </tbody>
      </table></div>
    </div>
    {del && <ConfirmDlg title="Remove Student" msg={`Remove "${del.name}"?`} onOk={doDelete} onCancel={() => setDel(null)} />}
  </>);
}
function StudentView({ student, school, onBack, onEdit }) {
  return (<>
    <BC items={["Students", student.name]} onBack={onBack} />
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div style={{ flex: "0 0 260px" }}>
        <div className="card cp" style={{ textAlign: "center" }}>
          <div className="av" style={{ width: 60, height: 60, margin: "0 auto 12px", fontSize: 20, background: `hsl(${student.id * 55 + 190},58%,52%)` }}>{student.name[0]}</div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{student.name}</div>
          <div style={{ fontSize: 12, color: "var(--t3)", marginTop: 3 }}>{school?.name || "—"}</div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 10 }}><Bdg type="blue" label={`Class ${student.class}`} /><span className="chip">Div {student.div}</span></div>
          <button className="btn bp" style={{ width: "100%", marginTop: 16, justifyContent: "center" }} onClick={() => onEdit(student)}><I n="edit" s={13} c="#fff" /> Edit Profile</button>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="card cp">
          <div className="section-tag">Student Details</div>
          <div className="fgrid" style={{ gap: 10 }}>
            {[["Roll No.", student.roll], ["Class", `Class ${student.class}`], ["Division", `Div ${student.div}`], ["Gender", student.gender || "—"], ["Date of Birth", student.dob || "—"], ["Phone", student.phone || "—"], ["Email", student.email || "—"], ["School", school?.name || "—"], ["Status", student.status === "active" ? "Enrolled" : "Dropped"]].map(([k, v]) => (
              <div key={k} className="vf"><div className="vf-l">{k}</div><div className="vf-v">{v}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>);
}
function StudentForm({ title, initial, schools, onSave, onBack }) {
  const [f, setF] = useState({ name: initial?.name || "", roll: initial?.roll || "", class: initial?.class || "", div: initial?.div || "", schoolId: initial?.schoolId || "", gender: initial?.gender || "", dob: initial?.dob || "", phone: initial?.phone || "", email: initial?.email || "", status: initial?.status || "active" });
  const s = (k, v) => setF(p => ({ ...p, [k]: v }));
  return (<>
    <BC items={["Students", title]} onBack={onBack} />
    <div className="card cp" style={{ maxWidth: 660 }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 18 }}>{title}</div>
      <div className="fgrid">
        <div className="fg"><label className="fl">Full Name *</label><input className="fi" value={f.name} onChange={e => s("name", e.target.value)} /></div>
        <div className="fg"><label className="fl">Roll Number *</label><input className="fi" value={f.roll} onChange={e => s("roll", e.target.value)} /></div>
        <div className="fg"><label className="fl">Class *</label><select className="fi" value={f.class} onChange={e => s("class", e.target.value)}><option value="">Select…</option>{["5", "6", "7", "8", "9", "10"].map(c => <option key={c}>{c}</option>)}</select></div>
        <div className="fg"><label className="fl">Division *</label><select className="fi" value={f.div} onChange={e => s("div", e.target.value)}><option value="">Select…</option>{["A", "B", "C", "D"].map(d => <option key={d}>{d}</option>)}</select></div>
        <div className="fg"><label className="fl">School *</label><select className="fi" value={f.schoolId} onChange={e => s("schoolId", Number(e.target.value))}><option value="">Select…</option>{schools.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select></div>
        <div className="fg"><label className="fl">Gender</label><select className="fi" value={f.gender} onChange={e => s("gender", e.target.value)}><option value="">Select…</option><option>Male</option><option>Female</option><option>Other</option></select></div>
        <div className="fg"><label className="fl">Date of Birth</label><input className="fi" type="date" value={f.dob} onChange={e => s("dob", e.target.value)} /></div>
        <div className="fg"><label className="fl">Phone</label><input className="fi" value={f.phone} onChange={e => s("phone", e.target.value)} /></div>
        <div className="fg"><label className="fl">Email</label><input className="fi" value={f.email} onChange={e => s("email", e.target.value)} /></div>
        <div className="fg"><label className="fl">Status</label><select className="fi" value={f.status} onChange={e => s("status", e.target.value)}><option value="active">Enrolled</option><option value="inactive">Dropped</option></select></div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button className="btn bp" onClick={() => onSave(f)}><I n="check" s={14} c="#fff" /> {initial ? "Update" : "Add Student"}</button>
        <button className="btn bg_" onClick={onBack}>Cancel</button>
      </div>
    </div>
  </>);
}

/* ═══════════════════════ EXAMS PAGE ════════════════════════════ */
function ExamsPage({ exams, setExams, teachers, centers, toast }) {
  const [sub, setSub] = useState("list");
  const [view, setView] = useState(null); const [edit, setEdit] = useState(null); const [del, setDel] = useState(null);
  const [q, setQ] = useState(""); const [ef, setEf] = useState("All"); const [stf, setStf] = useState("All");

  const filtered = useMemo(() => exams.filter(e => [e.name, e.teacher, e.type].join(" ").toLowerCase().includes(q.toLowerCase()) && (ef === "All" || e.exam === ef) && (stf === "All" || e.status === stf.toLowerCase())), [exams, q, ef, stf]);

  const doDelete = () => { setExams(p => p.filter(e => e.id !== del.id)); toast("Exam deleted"); setDel(null); };
  const doSave = (data) => {
    if (edit) { setExams(p => p.map(e => e.id === edit.id ? { ...e, ...data } : e)); toast("Exam updated!"); }
    else { setExams(p => [...p, { ...data, id: Date.now(), students: 0 }]); toast("Exam created!"); }
    setSub("list"); setEdit(null);
  };

  if (sub === "create") return <ExamForm title="Create Exam" teachers={teachers} centers={centers} onSave={doSave} onBack={() => setSub("list")} />;
  if (sub === "edit" && edit) return <ExamForm title="Edit Exam" initial={edit} teachers={teachers} centers={centers} onSave={doSave} onBack={() => { setSub("list"); setEdit(null); }} />;
  if (sub === "view" && view) return <ExamView exam={view} onBack={() => { setSub("list"); setView(null); }} onEdit={e => { setEdit(e); setSub("edit"); }} />;

  return (<>
    <div className="ph"><div className="ph-title">Exams Management</div></div>
    <div className="tb">
      <SB value={q} onChange={setQ} placeholder="Search exams, teacher…" />
      <select className="sel" value={stf} onChange={e => setStf(e.target.value)}><option>All</option><option>Active</option><option>Upcoming</option><option>Completed</option></select>
      <button className="btn bp" onClick={() => setSub("create")}><I n="plus" s={14} c="#fff" /> Create Exam</button>
      <button className="btn bg_" style={{ marginLeft: "auto" }} onClick={() => toast("Export started!", "suc")}><I n="download" s={13} /> Export</button>
    </div>
    <div className="pills" style={{ marginBottom: 14 }}>
      {EXAM_CATS.map(e => <button key={e} className={`pill${ef === e ? " on" : ""}`} onClick={() => setEf(e)}>{e}</button>)}
      <span style={{ fontSize: 12, color: "var(--t3)", alignSelf: "center", marginLeft: 6 }}>{filtered.length} exams</span>
    </div>
    <div className="card">
      <div className="tw"><table>
        <thead><tr><th>Exam Name</th><th>Category</th><th>Type</th><th>Date</th><th>Teacher</th><th>Students</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {filtered.length === 0 ? <tr><td colSpan={8}><div className="empty-s"><div className="empty-s-ic">📝</div><div className="empty-s-t">No exams found</div></div></td></tr>
            : filtered.map(e => (
              <tr key={e.id}>
                <td className="tdb">{e.name}</td><td><span className="chip">{e.exam}</span></td>
                <td><Bdg type="blue" label={e.type} /></td>
                <td className="td2">{new Date(e.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td className="td2">{e.teacher}</td><td style={{ fontWeight: 600 }}>{e.students}</td>
                <td><Bdg type={e.status === "completed" ? "green" : e.status === "active" ? "blue" : "yellow"} label={e.status.charAt(0).toUpperCase() + e.status.slice(1)} /></td>
                <td><div className="row-acts">
                  <button className="btn bp bsm" onClick={() => { setView(e); setSub("view"); }}><I n="eye" s={12} c="#fff" /> View</button>
                  <button className="btn bg_ bsm" onClick={() => { setEdit(e); setSub("edit"); }}><I n="edit" s={12} /></button>
                  <button className="btn bdn bsm" onClick={() => setDel(e)}><I n="trash" s={12} /></button>
                </div></td>
              </tr>
            ))}
        </tbody>
      </table></div>
    </div>
    {del && <ConfirmDlg title="Delete Exam" msg={`Delete "${del.name}"?`} onOk={doDelete} onCancel={() => setDel(null)} />}
  </>);
}
function ExamView({ exam, onBack, onEdit }) {
  return (<>
    <BC items={["Exams", exam.name]} onBack={onBack} />
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div style={{ flex: "0 0 250px" }}>
        <div className="card cp" style={{ marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, background: "#EFF6FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}><I n="exam" s={22} c="var(--p)" /></div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{exam.name}</div>
          <span className="chip" style={{ marginTop: 6 }}>{exam.exam}</span>
          <div style={{ marginTop: 8 }}><Bdg type={exam.status === "completed" ? "green" : exam.status === "active" ? "blue" : "yellow"} label={exam.status.charAt(0).toUpperCase() + exam.status.slice(1)} /></div>
          <button className="btn bp" style={{ width: "100%", marginTop: 14, justifyContent: "center" }} onClick={() => onEdit(exam)}><I n="edit" s={13} c="#fff" /> Edit Exam</button>
        </div>
        <div className="card cp">
          {[["Participants", exam.students, "#2563EB", "#EFF6FF"], ["Duration", `${exam.duration} min`, "#10B981", "#ECFDF5"], ["Max Students", exam.maxStudents, "#F97316", "#FFF7ED"]].map(([l, v, c, bg]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--bd)" }}>
              <span style={{ fontSize: 12.5, color: "var(--t2)" }}>{l}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: c, background: bg, padding: "2px 8px", borderRadius: 6 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="card cp">
          <div className="section-tag">Exam Details</div>
          <div className="fgrid" style={{ gap: 10 }}>
            {[["Exam Name", exam.name], ["Type", exam.type], ["Category", exam.exam], ["Date", new Date(exam.date).toLocaleDateString("en-IN", { dateStyle: "long" })], ["Teacher", exam.teacher], ["Center", exam.center || "—"], ["Description", exam.description || "—"]].map(([k, v]) => (
              <div key={k} className={`vf${k === "Description" ? " fgall" : ""}`}><div className="vf-l">{k}</div><div className="vf-v" style={{ fontWeight: k === "Description" ? 400 : 600, fontSize: 13 }}>{v}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>);
}
function ExamForm({ title, initial, teachers, centers, onSave, onBack }) {
  const [f, setF] = useState({ name: initial?.name || "", exam: initial?.exam || "", type: initial?.type || "", date: initial?.date || "", teacher: initial?.teacher || "", center: initial?.center || "", maxStudents: initial?.maxStudents || "", duration: initial?.duration || "", status: initial?.status || "upcoming", description: initial?.description || "" });
  const s = (k, v) => setF(p => ({ ...p, [k]: v }));
  return (<>
    <BC items={["Exams", title]} onBack={onBack} />
    <div className="card cp" style={{ maxWidth: 680 }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 18 }}>{title}</div>
      <div className="fgrid">
        <div className="fg fgall"><label className="fl">Exam Name *</label><input className="fi" value={f.name} onChange={e => s("name", e.target.value)} /></div>
        <div className="fg"><label className="fl">Category *</label><select className="fi" value={f.exam} onChange={e => s("exam", e.target.value)}><option value="">Select…</option>{["Manthan", "Shabbas", "ICS"].map(x => <option key={x}>{x}</option>)}</select></div>
        <div className="fg"><label className="fl">Type</label><select className="fi" value={f.type} onChange={e => s("type", e.target.value)}><option value="">Select…</option>{["Olympiad", "Aptitude", "Scholarship", "Proficiency"].map(x => <option key={x}>{x}</option>)}</select></div>
        <div className="fg"><label className="fl">Date *</label><input className="fi" type="date" value={f.date} onChange={e => s("date", e.target.value)} /></div>
        <div className="fg"><label className="fl">Duration (min)</label><input className="fi" type="number" value={f.duration} onChange={e => s("duration", e.target.value)} /></div>
        <div className="fg"><label className="fl">Assign Teacher</label><select className="fi" value={f.teacher} onChange={e => s("teacher", e.target.value)}><option value="">Select…</option>{teachers.map(t => <option key={t.id}>{t.name}</option>)}</select></div>
        <div className="fg"><label className="fl">Assign Center</label><select className="fi" value={f.center} onChange={e => s("center", e.target.value)}><option value="">Select…</option>{centers.map(c => <option key={c.id}>{c.name}</option>)}</select></div>
        <div className="fg"><label className="fl">Max Students</label><input className="fi" type="number" value={f.maxStudents} onChange={e => s("maxStudents", e.target.value)} /></div>
        <div className="fg"><label className="fl">Status</label><select className="fi" value={f.status} onChange={e => s("status", e.target.value)}><option value="upcoming">Upcoming</option><option value="active">Active</option><option value="completed">Completed</option></select></div>
        <div className="fg fgall"><label className="fl">Description</label><textarea className="ta" value={f.description} onChange={e => s("description", e.target.value)} /></div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button className="btn bp" onClick={() => onSave(f)}><I n="check" s={14} c="#fff" /> {initial ? "Update" : "Create Exam"}</button>
        <button className="btn bg_" onClick={onBack}>Cancel</button>
      </div>
    </div>
  </>);
}

/* ═══════════════════════ BOOKS PAGE ════════════════════════════ */
function BooksPage({ booksData, setBooksData, schools, toast }) {
  const [sub, setSub] = useState("list");
  const [edit, setEdit] = useState(null);
  const [q, setQ] = useState(""); const [scf, setScf] = useState("All"); const [stf, setStf] = useState("All");

  const filtered = useMemo(() => booksData.filter(b => [b.teacher, b.school].join(" ").toLowerCase().includes(q.toLowerCase()) && (scf === "All" || b.school === scf) && (stf === "All" || b.status === stf.toLowerCase())), [booksData, q, scf, stf]);

  const doSave = (data) => { setBooksData(p => p.map(b => b.id === edit.id ? { ...b, ...data, status: data.purchased < 40 ? "critical" : data.purchased < 48 ? "low" : "ok" } : b)); toast("Book record updated!"); setSub("list"); setEdit(null); };

  if (sub === "edit" && edit) return <BookEditForm book={edit} onSave={doSave} onBack={() => { setSub("list"); setEdit(null); }} />;

  return (<>
    <div className="ph"><div className="ph-title">Books Tracking</div></div>
    <div className="mini-stats">
      {[[booksData.reduce((a, b) => a + b.purchased, 0), "Total Purchased", "#EFF6FF", "#2563EB"], [booksData.reduce((a, b) => a + b.students, 0), "Total Students", "#ECFDF5", "#10B981"], [booksData.filter(b => b.status === "low").length, "Low Stock", "#FFFBEB", "#F59E0B"], [booksData.filter(b => b.status === "critical").length, "Critical", "#FEF2F2", "#EF4444"]].map(([v, l, bg, c]) => (
        <div key={l} className="mini-s" style={{ background: bg }}><div className="mini-v" style={{ color: c }}>{v}</div><div className="mini-l">{l}</div></div>
      ))}
    </div>
    <div className="tb">
      <SB value={q} onChange={setQ} placeholder="Search teacher, school…" />
      <select className="sel" value={scf} onChange={e => setScf(e.target.value)}><option>All</option>{schools.map(s => <option key={s.id}>{s.name}</option>)}</select>
      <select className="sel" value={stf} onChange={e => setStf(e.target.value)}><option>All</option><option>Ok</option><option>Low</option><option>Critical</option></select>
      <button className="btn bg_" style={{ marginLeft: "auto" }} onClick={() => toast("Export started!", "suc")}><I n="download" s={13} /> Export</button>
    </div>
    <div className="card">
      <div className="tw"><table>
        <thead><tr><th>Teacher Name</th><th>School</th><th>Books Purchased</th><th>Students</th><th>Stock Status</th><th>Actions</th></tr></thead>
        <tbody>
          {filtered.map((b, i) => (
            <tr key={i} className={b.status === "critical" ? "crit-row" : b.status === "low" ? "low-row" : ""}>
              <td className="tdb">{b.teacher}</td><td className="td2">{b.school}</td><td style={{ fontWeight: 700 }}>{b.purchased}</td>
              <td><div style={{ display: "flex", alignItems: "center", gap: 5 }}><I n="users" s={12} c="var(--p)" /><span style={{ fontWeight: 600, color: "var(--p)" }}>{b.students}</span></div></td>
              <td><Bdg type={b.status === "critical" ? "red" : b.status === "low" ? "yellow" : "green"} label={b.status === "critical" ? "Critical" : b.status === "low" ? "Low Stock" : "Sufficient"} /></td>
              <td><div className="row-acts">
                <button className="btn bg_ bsm" onClick={() => { setEdit(b); setSub("edit"); }}><I n="edit" s={12} /> Edit</button>
                <button className="btn bg_ bsm" onClick={() => toast(`Reminder sent to ${b.teacher}`, "suc")}>Remind</button>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  </>);
}
function BookEditForm({ book, onSave, onBack }) {
  const [f, setF] = useState({ purchased: book.purchased, students: book.students });
  return (<>
    <BC items={["Books", `Edit — ${book.teacher}`]} onBack={onBack} />
    <div className="card cp" style={{ maxWidth: 520 }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 18 }}>Edit Book Record</div>
      <div className="fgrid">
        <div className="fg"><label className="fl">Teacher</label><input className="fi" value={book.teacher} disabled /></div>
        <div className="fg"><label className="fl">School</label><input className="fi" value={book.school} disabled /></div>
        <div className="fg"><label className="fl">Books Purchased *</label><input className="fi" type="number" value={f.purchased} onChange={e => setF(p => ({ ...p, purchased: Number(e.target.value) }))} min={0} /></div>
        <div className="fg"><label className="fl">Students Count *</label><input className="fi" type="number" value={f.students} onChange={e => setF(p => ({ ...p, students: Number(e.target.value) }))} min={0} /></div>
        <div className="fg fgall">
          <div style={{ padding: "10px 14px", borderRadius: "var(--r3)", background: f.purchased < 40 ? "#FEF2F2" : f.purchased < 48 ? "#FFFBEB" : "#ECFDF5", border: `1px solid ${f.purchased < 40 ? "#FECACA" : f.purchased < 48 ? "#FDE68A" : "#A7F3D0"}` }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: f.purchased < 40 ? "#EF4444" : f.purchased < 48 ? "#F59E0B" : "#10B981" }}>{f.purchased < 40 ? "⚠ Critical stock" : f.purchased < 48 ? "⚠ Low stock" : "✓ Sufficient stock"}</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <button className="btn bp" onClick={() => onSave(f)}><I n="check" s={14} c="#fff" /> Update</button>
        <button className="btn bg_" onClick={onBack}>Cancel</button>
      </div>
    </div>
  </>);
}

/* ═══════════════════════ FEES PAGE ══════════════════════════════ */
function FeesPage({ fees, schools }) {
  const [sub, setSub] = useState("list");
  const [view, setView] = useState(null);
  const [q, setQ] = useState(""); const [stf, setStf] = useState("All"); const [scf, setScf] = useState("All Schools");

  const filtered = useMemo(() => fees.filter(f => [f.teacher, f.school].join(" ").toLowerCase().includes(q.toLowerCase()) && (stf === "All" || f.status === stf.toLowerCase()) && (scf === "All Schools" || f.school === scf)), [fees, q, stf, scf]);

  if (sub === "view" && view) return <FeesView fee={view} onBack={() => { setSub("list"); setView(null); }} />;

  return (<>
    <div className="ph"><div className="ph-title">Fees Management</div></div>
    <div className="mini-stats">
      {[[`₹${(fees.reduce((a, f) => a + f.total, 0) / 1000).toFixed(0)}k`, "Total Fees", "#EFF6FF", "#2563EB"], [`₹${(fees.reduce((a, f) => a + f.paid, 0) / 1000).toFixed(0)}k`, "Collected", "#ECFDF5", "#10B981"], [`₹${(fees.reduce((a, f) => a + f.pending, 0) / 1000).toFixed(0)}k`, "Pending", "#FEF2F2", "#EF4444"]].map(([v, l, bg, c]) => (
        <div key={l} className="mini-s" style={{ background: bg }}><div className="mini-v" style={{ color: c }}>{v}</div><div className="mini-l">{l}</div></div>
      ))}
      <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
        <button className="btn bp"><I n="send" s={13} c="#fff" /> Send Reminders</button>
        <button className="btn bg_"><I n="download" s={13} /> Export</button>
      </div>
    </div>
    <div className="tb">
      <SB value={q} onChange={setQ} placeholder="Search teacher, school…" />
      <select className="sel" value={scf} onChange={e => setScf(e.target.value)}><option>All Schools</option>{schools.map(s => <option key={s.id}>{s.name}</option>)}</select>
      <div className="pills">{["All", "Paid", "Partial", "Pending"].map(s => <button key={s} className={`pill${stf === s ? " on" : ""}`} onClick={() => setStf(s)}>{s}</button>)}</div>
    </div>
    <div className="card">
      <div className="tw"><table>
        <thead><tr><th>Teacher</th><th>School</th><th>Total</th><th>Paid</th><th>Pending</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {filtered.map((f, i) => (
            <tr key={i}>
              <td className="tdb">{f.teacher}</td><td className="td2">{f.school}</td>
              <td style={{ fontWeight: 600 }}>₹{f.total.toLocaleString()}</td>
              <td style={{ color: "var(--gd)", fontWeight: 600 }}>₹{f.paid.toLocaleString()}</td>
              <td style={{ color: f.pending > 0 ? "var(--rd)" : "var(--t3)", fontWeight: 600 }}>{f.pending > 0 ? `₹${f.pending.toLocaleString()}` : "—"}</td>
              <td><Bdg type={f.status === "paid" ? "green" : f.status === "partial" ? "yellow" : "red"} label={f.status.charAt(0).toUpperCase() + f.status.slice(1)} /></td>
              <td><div className="row-acts">
                <button className="btn bp bsm" onClick={() => { setView(f); setSub("view"); }}><I n="eye" s={12} c="#fff" /> View</button>
                {f.pending > 0 && <button className="btn bo bsm">Remind</button>}
              </div></td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  </>);
}
function FeesView({ fee, onBack }) {
  const pct = Math.round((fee.paid / fee.total) * 100) || 0;
  return (<>
    <BC items={["Fees", fee.teacher]} onBack={onBack} />
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div style={{ flex: "0 0 260px" }}>
        <div className="card cp" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
            <div className="av" style={{ width: 48, height: 48, fontSize: 16 }}>{fee.teacher.split(" ").map(w => w[0]).join("").slice(0, 2)}</div>
            <div><div style={{ fontWeight: 700, fontSize: 14 }}>{fee.teacher}</div><div style={{ fontSize: 12, color: "var(--t3)" }}>{fee.school}</div></div>
          </div>
          <Bdg type={fee.status === "paid" ? "green" : fee.status === "partial" ? "yellow" : "red"} label={fee.status.charAt(0).toUpperCase() + fee.status.slice(1)} />
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ fontSize: 12, color: "var(--t3)" }}>Payment Progress</span><span style={{ fontSize: 12, fontWeight: 700, color: "var(--gd)" }}>{pct}%</span></div>
            <div className="pw" style={{ height: 8 }}><div className="pf pg_" style={{ width: `${pct}%` }} /></div>
          </div>
        </div>
        <div className="card cp">
          {[["Total Fees", `₹${fee.total.toLocaleString()}`, "#0F172A"], ["Paid", `₹${fee.paid.toLocaleString()}`, "#10B981"], ["Pending", `₹${fee.pending.toLocaleString()}`, fee.pending > 0 ? "#EF4444" : "#10B981"]].map(([k, v, c]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--bd)" }}>
              <span style={{ fontSize: 12.5, color: "var(--t2)" }}>{k}</span><span style={{ fontSize: 14, fontWeight: 700, color: c }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="card cp">
          <div className="section-tag">Payment History</div>
          {fee.paid > 0 ? (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "var(--gl)", borderRadius: "var(--r3)", marginBottom: 8 }}>
              <div><div style={{ fontWeight: 600, fontSize: 13 }}>Payment Received</div><div style={{ fontSize: 12, color: "var(--t3)", marginTop: 2 }}>15 Apr 2025 · NEFT · Ref: TXN2025041501</div></div>
              <div style={{ fontWeight: 700, color: "var(--gd)", fontSize: 15 }}>₹{fee.paid.toLocaleString()}</div>
            </div>
          ) : <div style={{ textAlign: "center", padding: "24px", color: "var(--t3)", fontSize: 13 }}>No payments recorded yet</div>}
          {fee.pending > 0 && (
            <div style={{ marginTop: 14, padding: 14, background: "#FEF2F2", borderRadius: "var(--r3)", border: "1px solid #FECACA" }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#EF4444", marginBottom: 8 }}>Pending: ₹{fee.pending.toLocaleString()}</div>
              <button className="btn bdn bsm"><I n="sms" s={12} /> Send Reminder</button>
            </div>
          )}
        </div>
      </div>
    </div>
  </>);
}

/* ═══════════════════════ CENTERS PAGE ══════════════════════════ */
function CentersPage({ centers, setCenters, toast }) {
  const [sub, setSub] = useState("list");
  const [view, setView] = useState(null); const [edit, setEdit] = useState(null); const [del, setDel] = useState(null);
  const [q, setQ] = useState(""); const [cf, setCf] = useState("All");

  const withStatus = centers.map(c => ({ ...c, pct: Math.round((c.assigned / c.capacity) * 100), status: c.assigned >= c.capacity ? "full" : c.assigned / c.capacity > 0.8 ? "high" : "ok" }));
  const filtered = useMemo(() => withStatus.filter(c => [c.name, c.city].join(" ").toLowerCase().includes(q.toLowerCase()) && (cf === "All" || (cf === "Full" && c.status === "full") || (cf === "High" && c.status === "high") || (cf === "Available" && c.status === "ok"))), [withStatus, q, cf]);

  const doDelete = () => { setCenters(p => p.filter(c => c.id !== del.id)); toast("Center deleted"); setDel(null); };
  const doSave = (data) => {
    if (edit) { setCenters(p => p.map(c => c.id === edit.id ? { ...c, ...data } : c)); toast("Center updated!"); }
    else { setCenters(p => [...p, { ...data, id: Date.now(), assigned: 0 }]); toast("Center added!"); }
    setSub("list"); setEdit(null);
  };

  if (sub === "add") return <CenterForm title="Add Center" onSave={doSave} onBack={() => setSub("list")} />;
  if (sub === "edit" && edit) return <CenterForm title="Edit Center" initial={edit} onSave={doSave} onBack={() => { setSub("list"); setEdit(null); }} />;
  if (sub === "view" && view) return <CenterView center={withStatus.find(c => c.id === view.id) || view} onBack={() => { setSub("list"); setView(null); }} onEdit={c => { setEdit(c); setSub("edit"); }} />;

  return (<>
    <div className="ph"><div className="ph-title">Centers Management</div></div>
    <div className="tb">
      <SB value={q} onChange={setQ} placeholder="Search center, city…" />
      <div className="pills">{["All", "Available", "High", "Full"].map(s => <button key={s} className={`pill${cf === s ? " on" : ""}`} onClick={() => setCf(s)}>{s}</button>)}</div>
      <button className="btn bp" style={{ marginLeft: "auto" }} onClick={() => setSub("add")}><I n="plus" s={14} c="#fff" /> Add Center</button>
      <button className="btn bg_" onClick={() => toast("Export started!", "suc")}><I n="download" s={13} /> Export</button>
    </div>
    <div className="card">
      <div className="tw"><table>
        <thead><tr><th>Center Name</th><th>City</th><th>In-charge</th><th>Capacity</th><th>Assigned</th><th>Occupancy</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td className="tdb">{c.name}</td><td className="td2">{c.city}</td><td className="td2">{c.incharge}</td>
              <td>{c.capacity}</td><td style={{ fontWeight: 600, color: c.status === "full" ? "var(--rd)" : "var(--t1)" }}>{c.assigned}</td>
              <td style={{ minWidth: 120 }}><div style={{ display: "flex", alignItems: "center", gap: 7 }}><div className="pw" style={{ flex: 1 }}><div className={`pf ${c.pct >= 100 ? "pr_" : c.pct > 80 ? "py_" : "pb_"}`} style={{ width: `${Math.min(c.pct, 100)}%` }} /></div><span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--t3)" }}>{c.pct}%</span></div></td>
              <td>{c.status === "full" ? <Bdg type="red" label="Full" /> : c.status === "high" ? <Bdg type="yellow" label="High" /> : <Bdg type="green" label="Available" />}</td>
              <td><div className="row-acts">
                <button className="btn bp bsm" onClick={() => { setView(c); setSub("view"); }}><I n="eye" s={12} c="#fff" /> View</button>
                <button className="btn bg_ bsm" onClick={() => { setEdit(c); setSub("edit"); }}><I n="edit" s={12} /></button>
                <button className="btn bdn bsm" onClick={() => setDel(c)}><I n="trash" s={12} /></button>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
    {del && <ConfirmDlg title="Delete Center" msg={`Delete "${del.name}"?`} onOk={doDelete} onCancel={() => setDel(null)} />}
  </>);
}
function CenterView({ center, onBack, onEdit }) {
  return (<>
    <BC items={["Centers", center.name]} onBack={onBack} />
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div style={{ flex: "0 0 260px" }}>
        <div className="card cp" style={{ marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, background: "#EFF6FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}><I n="center" s={22} c="var(--p)" /></div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{center.name}</div>
          <div style={{ fontSize: 12.5, color: "var(--t3)", marginTop: 3 }}>{center.city}, {center.state}</div>
          <div style={{ marginTop: 8 }}>{center.status === "full" ? <Bdg type="red" label="Full" /> : center.status === "high" ? <Bdg type="yellow" label="High Occupancy" /> : <Bdg type="green" label="Available" />}</div>
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ fontSize: 12, color: "var(--t3)" }}>Capacity</span><span style={{ fontSize: 12, fontWeight: 700 }}>{center.pct}%</span></div>
            <div className="pw" style={{ height: 8 }}><div className={`pf ${center.pct >= 100 ? "pr_" : center.pct > 80 ? "py_" : "pg_"}`} style={{ width: `${Math.min(center.pct, 100)}%` }} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11, color: "var(--t3)" }}><span>{center.assigned} assigned</span><span>{center.capacity} capacity</span></div>
          </div>
          <button className="btn bp" style={{ width: "100%", marginTop: 14, justifyContent: "center" }} onClick={() => onEdit(center)}><I n="edit" s={13} c="#fff" /> Edit Center</button>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="card cp">
          <div className="section-tag">Center Details</div>
          <div className="fgrid" style={{ gap: 10 }}>
            {[["Name", center.name], ["City", center.city], ["State", center.state || "—"], ["Address", center.address || "—"], ["Capacity", center.capacity], ["Assigned", center.assigned], ["In-charge", center.incharge || "—"], ["Contact", center.contact || "—"]].map(([k, v]) => (
              <div key={k} className="vf"><div className="vf-l">{k}</div><div className="vf-v">{v}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>);
}
function CenterForm({ title, initial, onSave, onBack }) {
  const [f, setF] = useState({ name: initial?.name || "", city: initial?.city || "", state: initial?.state || "", address: initial?.address || "", capacity: initial?.capacity || "", incharge: initial?.incharge || "", contact: initial?.contact || "" });
  const s = (k, v) => setF(p => ({ ...p, [k]: v }));
  return (<>
    <BC items={["Centers", title]} onBack={onBack} />
    <div className="card cp" style={{ maxWidth: 600 }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 18 }}>{title}</div>
      <div className="fgrid">
        <div className="fg fgall"><label className="fl">Center Name *</label><input className="fi" value={f.name} onChange={e => s("name", e.target.value)} /></div>
        <div className="fg"><label className="fl">City *</label><input className="fi" value={f.city} onChange={e => s("city", e.target.value)} /></div>
        <div className="fg"><label className="fl">State</label><input className="fi" value={f.state} onChange={e => s("state", e.target.value)} /></div>
        <div className="fg fgall"><label className="fl">Full Address</label><input className="fi" value={f.address} onChange={e => s("address", e.target.value)} /></div>
        <div className="fg"><label className="fl">Capacity *</label><input className="fi" type="number" value={f.capacity} onChange={e => s("capacity", Number(e.target.value))} /></div>
        <div className="fg"><label className="fl">Contact</label><input className="fi" value={f.contact} onChange={e => s("contact", e.target.value)} /></div>
        <div className="fg fgall"><label className="fl">In-charge Name</label><input className="fi" value={f.incharge} onChange={e => s("incharge", e.target.value)} /></div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button className="btn bp" onClick={() => onSave(f)}><I n="check" s={14} c="#fff" /> {initial ? "Update" : "Add Center"}</button>
        <button className="btn bg_" onClick={onBack}>Cancel</button>
      </div>
    </div>
  </>);
}

/* ═══════════════════════ NOTIFICATIONS PAGE ════════════════════ */
function NotificationsPage() {
  const [q, setQ] = useState(""); const [tf, setTf] = useState("All");
  const sent = [
    { title: "Exam Reminder - Olympiad 2025", target: "All Teachers", type: "SMS", sent: "2 hours ago", count: 142 },
    { title: "Fee Payment Deadline", target: "Pending Fee Teachers", type: "Alert", sent: "1 day ago", count: 28 },
    { title: "New Exam Schedule Released", target: "All Students", type: "SMS", sent: "3 days ago", count: 1240 },
    { title: "Book Return Reminder", target: "Low Stock Teachers", type: "Alert", sent: "5 days ago", count: 15 },
    { title: "ICS Results Published", target: "All Schools", type: "Push", sent: "1 week ago", count: 890 },
  ];
  const filt = sent.filter(s => [s.title, s.target].join(" ").toLowerCase().includes(q.toLowerCase()) && (tf === "All" || s.type === tf));
  return (<>
    <div className="ph"><div className="ph-title">Notifications</div></div>
    <div className="g2" style={{ gap: 18 }}>
      <div>
        <div className="card cp" style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Compose Message</div>
          <div className="fg" style={{ marginBottom: 10 }}><label className="fl">Title</label><input className="fi" placeholder="e.g. Exam Reminder" /></div>
          <div className="fg" style={{ marginBottom: 10 }}><label className="fl">Send To</label><select className="fi"><option>All Teachers</option><option>All Students</option><option>All Schools</option><option>Pending Fee Teachers</option><option>Low Stock Teachers</option></select></div>
          <div className="fg" style={{ marginBottom: 14 }}><label className="fl">Message</label><textarea className="ta" placeholder="Type your message here…" /></div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn bp"><I n="sms" s={13} c="#fff" /> Send SMS</button>
            <button className="btn bo"><I n="alert_ic" s={13} c="var(--p)" /> Send Alert</button>
            <button className="btn bg_"><I n="notif" s={13} /> Push</button>
          </div>
        </div>
        <div className="card cp">
          <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 12 }}>Quick Templates</div>
          {["Exam Reminder", "Fee Due Notice", "Book Return Alert", "Result Published", "Schedule Update"].map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--bd)" }}>
              <span style={{ fontSize: 12.5, fontWeight: 500 }}>{t}</span>
              <button className="btn bg_ bsm">Use</button>
            </div>
          ))}
        </div>
      </div>
      <div className="card cp">
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Sent History</div>
        <div className="tb" style={{ marginBottom: 14 }}>
          <SB value={q} onChange={setQ} placeholder="Search…" />
          <div className="pills">{["All", "SMS", "Alert", "Push"].map(t => <button key={t} className={`pill${tf === t ? " on" : ""}`} onClick={() => setTf(t)}>{t}</button>)}</div>
        </div>
        {filt.map((s, i) => (
          <div key={i} style={{ padding: "13px 0", borderBottom: "1px solid var(--bd)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{s.title}</span>
              <span className={`bdg ${s.type === "SMS" ? "bdg-b" : s.type === "Alert" ? "bdg-y" : "bdg-g"}`}><span className="bdg-dot" />{s.type}</span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--t3)" }}>Target: {s.target}</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
              <span style={{ fontSize: 11.5, color: "var(--t3)" }}>{s.sent}</span>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--gd)" }}>{s.count} delivered</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>);
}

/* ═══════════════════════ REPORTS PAGE ══════════════════════════ */
function ReportsPage({ schools, exams }) {
  const [q, setQ] = useState(""); const [scf, setScf] = useState("All"); const [ef, setEf] = useState("All");
  const rows = [
    { school: "Ryan International", exam: "Olympiad 2025", students: 480, pass: 425, fail: 55, pct: 88, fees: "paid" },
    { school: "Delhi Public School", exam: "Aptitude Test", students: 320, pass: 262, fail: 58, pct: 82, fees: "partial" },
    { school: "Podar International", exam: "Math Olympiad", students: 560, pass: 443, fail: 117, pct: 79, fees: "paid" },
    { school: "St. Mary's Convent", exam: "Proficiency", students: 280, pass: 207, fail: 73, pct: 74, fees: "pending" },
    { school: "Kendriya Vidyalaya", exam: "ICS Regional", students: 390, pass: 280, fail: 110, pct: 72, fees: "partial" },
  ];
  const filt = rows.filter(r => [r.school, r.exam].join(" ").toLowerCase().includes(q.toLowerCase()));
  const pdata = [75, 82, 68, 90, 78, 85, 72, 88, 65, 91, 80, 76];
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return (<>
    <div className="ph"><div className="ph-title">Reports & Analytics</div></div>
    <div className="card cp" style={{ marginBottom: 18 }}>
      <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 12 }}>Filters</div>
      <div className="tb">
        <SB value={q} onChange={setQ} placeholder="Search school, exam…" />
        <select className="sel" value={scf} onChange={e => setScf(e.target.value)}><option>All</option>{schools.map(s => <option key={s.id}>{s.name}</option>)}</select>
        <div className="pills">{EXAM_CATS.map(e => <button key={e} className={`pill${ef === e ? " on" : ""}`} onClick={() => setEf(e)}>{e}</button>)}</div>
        <button className="btn bp" style={{ marginLeft: "auto" }}><I n="download" s={13} c="#fff" /> Export PDF</button>
      </div>
    </div>
    <div className="stat-grid" style={{ marginBottom: 18 }}>
      {[{ l: "Avg Pass Rate", v: "79.4%", ic: "trend", c: "#10B981", bg: "#ECFDF5" }, { l: "Total Exams", v: String(exams.length), ic: "exam", c: "#2563EB", bg: "#EFF6FF" }, { l: "Fees Collected", v: "₹47.5L", ic: "fees", c: "#7C3AED", bg: "#F5F3FF" }, { l: "Top School", v: "Ryan Intl.", ic: "school", c: "#F97316", bg: "#FFF7ED" }].map(s => (
        <div className="stat-card" key={s.l}><div className="stat-top"><div className="stat-icon" style={{ background: s.bg }}><I n={s.ic} s={19} c={s.c} /></div></div><div className="stat-val" style={{ fontSize: 22 }}>{s.v}</div><div className="stat-lbl">{s.l}</div></div>
      ))}
    </div>
    <div className="chart-grid" style={{ marginBottom: 18 }}>
      <div className="card cp">
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Monthly Pass Rate (%)</div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column-reverse", justifyContent: "space-between", paddingBottom: 22, paddingRight: 7, width: 30 }}>
            {[0, 25, 50, 75, 100].map(t => <span key={t} style={{ fontSize: 8.5, color: "var(--t3)", fontWeight: 600, textAlign: "right" }}>{t}%</span>)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ position: "relative", height: 130, borderLeft: "1.5px solid var(--bd)", borderBottom: "1.5px solid var(--bd)" }}>
              {[25, 50, 75, 100].map(t => <div key={t} style={{ position: "absolute", left: 0, right: 0, bottom: `${t}%`, borderTop: "1px dashed #E9EEF5" }} />)}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: "100%", padding: "0 5px" }}>
                {pdata.map((v, i) => <div key={i} style={{ flex: 1, height: `${v}%`, background: v > 85 ? "#10B981" : v < 70 ? "#EF4444" : "#2563EB", borderRadius: "3px 3px 0 0", opacity: .85 }} />)}
              </div>
            </div>
            <div style={{ display: "flex", gap: 5, padding: "4px 5px 0" }}>{months.map(m => <div key={m} style={{ flex: 1, textAlign: "center", fontSize: 8.5, color: "var(--t3)" }}>{m}</div>)}</div>
          </div>
        </div>
      </div>
      <div className="card cp">
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>School-wise Performance</div>
        {[{ n: "Ryan International", r: 88 }, { n: "Delhi Public", r: 82 }, { n: "Podar Intl.", r: 79 }, { n: "St. Mary's", r: 74 }, { n: "Kendriya V.", r: 71 }].map(s => (
          <div key={s.n} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 12, fontWeight: 600 }}>{s.n}</span><span style={{ fontSize: 12, fontWeight: 700, color: s.r > 80 ? "var(--gd)" : "var(--t2)" }}>{s.r}%</span></div>
            <div className="pw"><div className={`pf ${s.r > 80 ? "pg_" : "pb_"}`} style={{ width: `${s.r}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
    <div className="card cp">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>Detailed Report</div>
        <button className="btn bg_ bsm"><I n="download" s={12} /> Export CSV</button>
      </div>
      <div className="tw"><table>
        <thead><tr><th>School</th><th>Exam</th><th>Students</th><th>Pass</th><th>Fail</th><th>Pass Rate</th><th>Fees</th></tr></thead>
        <tbody>
          {filt.map((r, i) => (
            <tr key={i}>
              <td className="tdb">{r.school}</td><td className="td2">{r.exam}</td><td>{r.students}</td>
              <td style={{ color: "var(--gd)", fontWeight: 600 }}>{r.pass}</td><td style={{ color: "var(--rd)", fontWeight: 600 }}>{r.fail}</td>
              <td><div style={{ display: "flex", alignItems: "center", gap: 7 }}><div className="pw" style={{ width: 55 }}><div className={`pf ${r.pct > 80 ? "pg_" : "pb_"}`} style={{ width: `${r.pct}%` }} /></div><span style={{ fontSize: 11.5, fontWeight: 700 }}>{r.pct}%</span></div></td>
              <td><Bdg type={r.fees === "paid" ? "green" : r.fees === "partial" ? "yellow" : "red"} label={r.fees.charAt(0).toUpperCase() + r.fees.slice(1)} /></td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  </>);
}

/* ═══════════════════════ SETTINGS FULL PAGE ════════════════════ */
function SettingsPageFull() {
  const [tab, setTab] = useState("roles");
  const [prefs, setPrefs] = useState({ emailNotif: true, smsNotif: true, autoReport: false, darkMode: false, twoFactor: true });
  const roles = [
    { name: "Super Admin", users: 1, color: "#2563EB", perms: ["Full Platform Access", "User Management", "System Config"] },
    { name: "Exam Manager", users: 3, color: "#10B981", perms: ["Exams", "Centers", "Reports"] },
    { name: "School Coordinator", users: 8, color: "#F97316", perms: ["Schools", "Teachers", "Students"] },
    { name: "Finance Officer", users: 2, color: "#7C3AED", perms: ["Fees", "Reports"] },
  ];
  return (<>
    <div className="ph"><div className="ph-title">Settings</div><div className="ph-sub">Roles & Permissions · Exam Templates · System Preferences</div></div>
    <div className="tabs">
      {[{ id: "roles", ic: "role", l: "Roles & Permissions" }, { id: "templates", ic: "template", l: "Exam Templates" }, { id: "prefs", ic: "pref", l: "System Preferences" }, { id: "account", ic: "lock", l: "Account & Security" }].map(t => (
        <button key={t.id} className={`tab${tab === t.id ? " on" : ""}`} onClick={() => setTab(t.id)}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><I n={t.ic} s={13} />{t.l}</span>
        </button>
      ))}
    </div>
    {tab === "roles" && (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Role Management</div>
          <button className="btn bp"><I n="plus" s={14} c="#fff" /> Add Role</button>
        </div>
        <div className="g2">
          {roles.map((r, i) => (
            <div key={i} className="card cp">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 42, height: 42, background: r.color + "20", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}><I n="shield" s={20} c={r.color} /></div>
                  <div><div style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</div><div style={{ fontSize: 12, color: "var(--t3)", marginTop: 2 }}>{r.users} user{r.users !== 1 ? "s" : ""}</div></div>
                </div>
                <button className="btn bg_ bsm"><I n="edit" s={12} /> Edit</button>
              </div>
              <div className="section-tag">Permissions</div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{r.perms.map(p => <span key={p} className="chip" style={{ fontSize: 10 }}>{p}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    )}
    {tab === "templates" && (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Exam Templates</div>
          <button className="btn bp"><I n="plus" s={14} c="#fff" /> New Template</button>
        </div>
        <div className="g2">
          {[{ n: "Olympiad Template", t: "Olympiad", d: "120 min", q: 80, c: "#2563EB", bg: "#EFF6FF" }, { n: "Scholarship Template", t: "Scholarship", d: "180 min", q: 100, c: "#10B981", bg: "#ECFDF5" }, { n: "Aptitude Template", t: "Aptitude", d: "90 min", q: 60, c: "#F97316", bg: "#FFF7ED" }, { n: "Proficiency Template", t: "Proficiency", d: "60 min", q: 50, c: "#7C3AED", bg: "#F5F3FF" }].map((t, i) => (
            <div key={i} className="card cp" style={{ cursor: "pointer", transition: "all .15s" }}>
              <div style={{ width: 44, height: 44, background: t.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}><I n="template" s={20} c={t.c} /></div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{t.n}</div>
              <div style={{ fontSize: 12, color: "var(--t3)", margin: "5px 0 10px" }}>{t.t} · {t.d} · {t.q} Questions</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn bo bsm" style={{ flex: 1 }}>Preview</button>
                <button className="btn bg_ bsm" style={{ flex: 1 }}><I n="edit" s={12} /> Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    {tab === "prefs" && (
      <div className="g2">
        <div className="card cp">
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Notification Preferences</div>
          {[["Email Notifications", "Receive alerts via email", "emailNotif"], ["SMS Notifications", "Get SMS for important updates", "smsNotif"], ["Auto-generate Reports", "Weekly auto-generated reports", "autoReport"], ["Dark Mode", "Use dark interface", "darkMode"], ["Two-factor Auth", "Enhanced login security", "twoFactor"]].map(([title, sub, key]) => (
            <div key={key} className="perm-row">
              <div><div style={{ fontSize: 13.5, fontWeight: 600 }}>{title}</div><div style={{ fontSize: 12, color: "var(--t3)" }}>{sub}</div></div>
              <div className="tog" style={{ background: prefs[key] ? "var(--p)" : "var(--bd)" }} onClick={() => setPrefs(p => ({ ...p, [key]: !p[key] }))}>
                <div className="tok" style={{ left: prefs[key] ? 21 : 3 }} />
              </div>
            </div>
          ))}
          <button className="btn bp" style={{ marginTop: 18 }}><I n="check" s={14} c="#fff" /> Save Preferences</button>
        </div>
        <div className="card cp">
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>General Settings</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="fg"><label className="fl">Platform Name</label><input className="fi" defaultValue="ExamPro Management Platform" /></div>
            <div className="fg"><label className="fl">Admin Email</label><input className="fi" defaultValue="admin@exampro.in" /></div>
            <div className="fg"><label className="fl">Language</label><select className="fi"><option>English</option><option>Hindi</option><option>Marathi</option></select></div>
            <div className="fg"><label className="fl">Timezone</label><select className="fi"><option>Asia/Kolkata (IST)</option></select></div>
            <button className="btn bp"><I n="check" s={14} c="#fff" /> Save Changes</button>
          </div>
        </div>
      </div>
    )}
    {tab === "account" && (
      <div className="g2">
        <div className="card cp">
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Change Password</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="fg"><label className="fl">Current Password</label><input className="fi" type="password" placeholder="••••••••" /></div>
            <div className="fg"><label className="fl">New Password</label><input className="fi" type="password" placeholder="••••••••" /></div>
            <div className="fg"><label className="fl">Confirm Password</label><input className="fi" type="password" placeholder="••••••••" /></div>
            <button className="btn bp"><I n="lock" s={14} c="#fff" /> Update Password</button>
          </div>
        </div>
        <div className="card cp">
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Security Settings</div>
          {[["Two-Factor Authentication", "Add extra security to your account", true], ["Login Alerts", "Get notified on new logins", true], ["Session Timeout", "Auto-logout after inactivity", false]].map(([t, s, on]) => (
            <div key={t} className="perm-row">
              <div><div style={{ fontSize: 13.5, fontWeight: 600 }}>{t}</div><div style={{ fontSize: 12, color: "var(--t3)" }}>{s}</div></div>
              <div className="tog" style={{ background: on ? "var(--p)" : "var(--bd)" }}><div className="tok" style={{ left: on ? 21 : 3 }} /></div>
            </div>
          ))}
        </div>
      </div>
    )}
  </>);
}
