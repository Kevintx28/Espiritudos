import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Hash, MessageCircle, Phone, Calendar, Clock, CreditCard, MessageSquare } from 'lucide-react';

const UserForm = ({ country, onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    epicId: '',
    discord: '',
    whatsapp: '',
    date: '',
    time: '',
    paymentMethod: '',
    comments: ''
  });

  const [errors, setErrors] = useState({});
  const paymentMethods = window.PAYMENT_METHODS?.[country.code] || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.epicId.trim()) newErrors.epicId = 'El Epic ID es requerido';
    if (!formData.date) newErrors.date = 'La fecha es requerida';
    if (!formData.time) newErrors.time = 'La hora es requerida';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'El método de pago es requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            data-testid="back-to-summary"
            onClick={onBack}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al resumen
          </button>
          
          <h2 className="text-4xl font-bold text-white tracking-tight">
            Tus Datos
          </h2>
          <p className="text-slate-400 mt-2">
            Completa la información para procesar tu pedido
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#18181b] border border-white/10 rounded-2xl p-8">
          <div className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <User className="w-5 h-5 text-purple-400" />
                Nombre Completo *
              </label>
              <input
                type="text"
                name="name"
                data-testid="input-name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Tu nombre completo"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Epic ID */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <Hash className="w-5 h-5 text-purple-400" />
                Epic ID *
              </label>
              <input
                type="text"
                name="epicId"
                data-testid="input-epic-id"
                value={formData.epicId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Tu Epic Games ID"
              />
              {errors.epicId && <p className="text-red-400 text-sm mt-1">{errors.epicId}</p>}
            </div>

            {/* Discord */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <MessageCircle className="w-5 h-5 text-purple-400" />
                Discord (opcional)
              </label>
              <input
                type="text"
                name="discord"
                data-testid="input-discord"
                value={formData.discord}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="usuario#1234"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <Phone className="w-5 h-5 text-purple-400" />
                WhatsApp (opcional)
              </label>
              <input
                type="tel"
                name="whatsapp"
                data-testid="input-whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="+51 999 999 999"
              />
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  Fecha Disponible *
                </label>
                <input
                  type="date"
                  name="date"
                  data-testid="input-date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
                {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  Hora Disponible *
                </label>
                <input
                  type="time"
                  name="time"
                  data-testid="input-time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
                {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time}</p>}
              </div>
            </div>

            {/* Método de Pago */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-3">
                <CreditCard className="w-5 h-5 text-purple-400" />
                Método de Pago *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    data-testid={`payment-${method.id}`}
                    onClick={() => handleChange({ target: { name: 'paymentMethod', value: method.id } })}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.paymentMethod === method.id
                        ? 'border-purple-500 bg-purple-500/10 neon-glow'
                        : 'border-white/10 bg-black/20 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{method.icon}</div>
                    <div className="text-white font-semibold">{method.name}</div>
                  </button>
                ))}
              </div>
              {errors.paymentMethod && <p className="text-red-400 text-sm mt-1">{errors.paymentMethod}</p>}
            </div>

            {/* Comentarios */}
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                Comentarios (opcional)
              </label>
              <textarea
                name="comments"
                data-testid="input-comments"
                value={formData.comments}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                placeholder="Algún comentario adicional..."
              />
            </div>
          </div>

          <button
            type="submit"
            data-testid="submit-form"
            className="w-full mt-8 btn-gaming py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-lg flex items-center justify-center gap-3"
          >
            Continuar a Confirmación
            <ArrowRight className="w-6 h-6" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default UserForm;