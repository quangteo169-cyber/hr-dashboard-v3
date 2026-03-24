'use client';
import useSWR from 'swr';
import CountUp from 'react-countup';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Page() {
  const { data } = useSWR('/api/data', fetcher, {
    refreshInterval: 30000
  });

  if (!data) return <div>Loading...</div>;

  const levels = data.levels;

  return (
    <div style={{ padding: 20 }}>
      <h1>HR Dashboard (CSV)</h1>

      <div style={{ fontSize: 12, color: "#888" }}>
        Live • CSV • Auto refresh 30s
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 20 }}>
        {Object.keys(levels).map(k => (
          <div key={k} style={{ border: '1px solid #ccc', padding: 10, borderRadius: 8 }}>
            <div>{k}</div>
            <strong style={{ fontSize: 22 }}>
              <CountUp end={levels[k]} />
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
