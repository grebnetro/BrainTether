// Persistent Serverless Cloud KV Store for BrainTether
const BUCKET_ID = 'bt_braintether_cloud_tasks_v1';

export async function getCloudTasks(email: string): Promise<any[] | null> {
  if (!email || email === 'guest@braintether.app') return null;

  try {
    const cleanKey = email.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const res = await fetch(`https://kvdb.io/${BUCKET_ID}/user_tasks_${cleanKey}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data;
      }
    }
  } catch (e) {
    console.warn('Cloud KV Get Error:', e);
  }
  return null;
}

export async function setCloudTasks(email: string, tasks: any[]): Promise<boolean> {
  if (!email || email === 'guest@braintether.app' || !Array.isArray(tasks)) return false;

  try {
    const cleanKey = email.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const res = await fetch(`https://kvdb.io/${BUCKET_ID}/user_tasks_${cleanKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tasks),
    });

    return res.ok;
  } catch (e) {
    console.warn('Cloud KV Set Error:', e);
    return false;
  }
}
