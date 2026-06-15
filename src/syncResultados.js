const API_TOKEN = 'a8c8c9a544c8471ba7a8264726b7b039';

// Mapeo ID de la API → ID de tu app
const MAPA_PARTIDOS = {
  537327: 'A1', 537328: 'A2', 537329: 'A3', 537330: 'A4', 537331: 'A5', 537332: 'A6',
  537333: 'B1', 537334: 'B2', 537335: 'B3', 537336: 'B4', 537337: 'B5', 537338: 'B6',
  537339: 'C1', 537340: 'C2', 537342: 'C3', 537341: 'C4', 537343: 'C5', 537344: 'C6',
  537345: 'D1', 537346: 'D2', 537347: 'D3', 537348: 'D4', 537349: 'D5', 537350: 'D6',
  537351: 'E1', 537352: 'E2', 537353: 'E3', 537354: 'E4', 537355: 'E5', 537356: 'E6',
  537357: 'F1', 537358: 'F2', 537359: 'F3', 537360: 'F4', 537361: 'F5', 537362: 'F6', // F5 y F6 invertidos en tu app - revisar
  537363: 'G1', 537364: 'G2', 537365: 'G3', 537366: 'G4', 537367: 'G5', 537368: 'G6', // G5 y G6 invertidos
  537369: 'H1', 537370: 'H2', 537371: 'H3', 537372: 'H4', 537373: 'H6', 537374: 'H5',
  537391: 'I1', 537392: 'I2', 537393: 'I3', 537394: 'I4', 537395: 'I6', 537396: 'I5',
  537397: 'J1', 537398: 'J2', 537399: 'J3', 537400: 'J4', 537401: 'J6', 537402: 'J5',
  537403: 'K1', 537404: 'K2', 537405: 'K3', 537406: 'K4', 537407: 'K5', 537408: 'K6',
  537409: 'L1', 537410: 'L2', 537411: 'L3', 537412: 'L4', 537413: 'L6', 537414: 'L5',
};

export async function syncResultados() {
  const res = await fetch(
    'https://api.football-data.org/v4/competitions/WC/matches?season=2026&stage=GROUP_STAGE',
    { headers: { 'X-Auth-Token': API_TOKEN } }
  );
  const data = await res.json();

  const terminados = data.matches.filter(m => m.status === 'FINISHED');

  for (const match of terminados) {
    const miId = MAPA_PARTIDOS[match.id];
    if (!miId) continue;

    const g1 = String(match.score.fullTime.home);
    const g2 = String(match.score.fullTime.away);

    await supabase
      .from('marcadores_reales')
      .upsert({ id: miId, g1, g2 }, { onConflict: 'id' });
  }

  console.log(`✅ Sync completado: ${terminados.length} partidos terminados`);
}