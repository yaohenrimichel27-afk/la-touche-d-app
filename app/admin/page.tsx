"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase.from("orders").select("*");
    setOrders(data || []);
  };

  const total = orders.reduce((a, b) => a + b.total, 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Dashboard</h2>

      <h3>💰 Total: {total} FCFA</h3>

      {orders.map((o, i) => (
        <p key={i}>{o.total} FCFA</p>
      ))}
    </div>
  );
}
