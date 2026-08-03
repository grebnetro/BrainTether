// Persistent Global Cloud KV Store for BrainTether
const MASTER_BLOB_ID = '019fc877-5dfc-742d-a4b5-b0bf9a944d5a';
const BLOB_URL = `https://jsonblob.com/api/jsonBlob/${MASTER_BLOB_ID}`;

export async function getCloudTasks(email: string): Promise<any[] | null> {
  if (!email || email === 'guest@braintether.app') return null;

  try {
    const cleanKey = email.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
    const res = await fetch(BLOB_URL, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (res.ok) {
      const store = await res.json();
      if (store && Array.isArray(store[cleanKey])) {
        return store[cleanKey];
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
    const cleanKey = email.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
    
    // Fetch current master store dictionary
    let store: Record<string, any[]> = {};
    try {
      const getRes = await fetch(BLOB_URL, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (getRes.ok) {
        const parsed = await getRes.json();
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          store = parsed;
        }
      }
    } catch {
      store = {};
    }

    // Save tasks under user's email key
    store[cleanKey] = tasks;

    const putRes = await fetch(BLOB_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(store),
    });

    return putRes.ok;
  } catch (e) {
    console.warn('Cloud KV Set Error:', e);
    return false;
  }
}
