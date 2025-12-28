import type { Permissions } from '../services/permission';

export default function HistoryTable({
  applications,
  loading,
}: {
  applications: Permissions[];
  loading?: boolean;
}) {
  return (
    <section className="card">
      <h2>🕒 Licensing History</h2>

      {loading ? (
        <p>loading</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Waktu Berangkat</th>
              <th>Waktu Pulang</th>
              <th>Keperluan</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {!applications || applications.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center' }}>
                  Belum ada Pengajuan
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id}>
                  <td>{new Date(app.start_time).toLocaleString()}</td>
                  <td>{new Date(app.end_time).toLocaleString()}</td>
                  <td>{app.reason}</td>
                  <td>
                    <span className={`status-pill status-${app.status}`}>
                      {app.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}
