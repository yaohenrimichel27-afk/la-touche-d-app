"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function POS() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  };

  const add = (p: any) => setCart([...cart, p]);

  const total = cart.reduce((a, b) => a + b.price, 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>🍔 CAISSE</h2>

      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          <b>{p.name}</b> - {p.price} FCFA
          <button onClick={() => add(p)}>Ajouter</button>
        </div>
      ))}

      <hr />

      <h3>Total: {total} FCFA</h3>

      <a
        href={`https://wa.me/2250708175027?text=${encodeURIComponent(
          "Rapport caisse: " + total + " FCFA"
        )}`}
      >
        Envoyer WhatsApp
      </a>
    </div>
  );
}
