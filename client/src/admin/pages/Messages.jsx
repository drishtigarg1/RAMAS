import { useEffect, useState } from "react";
import contactApi from "../../api/contactApi";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const load = async () => setMessages((await contactApi.list()).data);
  useEffect(() => { load().catch(() => {}); }, []);

  const markRead = async (id) => { await contactApi.markRead(id); await load(); };
  const remove = async (id) => { if (window.confirm("Delete this message?")) { await contactApi.remove(id); await load(); } };

  return <div className="space-y-6">
    <h1 className="text-2xl font-bold text-slate-800">Contact Messages</h1>
    <div className="space-y-4">
      {messages.map((message) => <article key={message._id} className={`rounded-xl border bg-white p-5 ${message.isRead ? "" : "border-orange-300"}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><h2 className="font-semibold text-slate-800">{message.subject}</h2><p className="text-sm text-slate-500">{message.name} · {message.email}</p></div>
          <div className="flex gap-2"><button onClick={() => markRead(message._id)} className="text-sm text-blue-600">Mark read</button><button onClick={() => remove(message._id)} className="text-sm text-red-600">Delete</button></div>
        </div>
        <p className="mt-4 whitespace-pre-wrap text-slate-700">{message.message}</p>
      </article>)}
      {!messages.length && <p className="rounded-xl bg-white p-6 text-slate-500">No messages yet.</p>}
    </div>
  </div>;
}
