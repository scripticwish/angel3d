import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

interface BookingModalProps {
  open: boolean;
  presetProgram?: string;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  presetProgram,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [ageGroup, setAgeGroup] = useState('Ребёнок 3–6 лет');
  const [program, setProgram] = useState(presetProgram || 'Пробная тренировка');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (presetProgram) setProgram(presetProgram);
    if (open) setSubmitted(false);
  }, [presetProgram, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(`Заявка принята! Скоро свяжемся с вами, ${name}.`);
      onClose();
      setName('');
      setContact('');
    }, 1100);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-ink/60 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-[32px] bg-white p-7 sm:p-9 shadow-2xl border border-ink/10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть окно"
              className="absolute top-6 right-6 h-10 w-10 rounded-full bg-glacial hover:bg-ink hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="w-14 h-14 text-cobalt mx-auto" />
                <h3 className="mt-4 font-display font-bold text-3xl uppercase text-ink">
                  Вы в списке на лёд!
                </h3>
                <p className="mt-2 text-sm text-slate-muted">
                  Администратор Angel.Team свяжется с вами в ближайшее время и подтвердит удобный слот.
                </p>
              </div>
            ) : (
              <>
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt">
                  ANGEL.TEAM // ЗАПИСЬ
                </div>
                <h3 className="mt-2 font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight frost-text">
                  ПРОБНАЯ ТРЕНИРОВКА
                </h3>
                <p className="mt-1.5 text-sm text-slate-muted">
                  Оставьте контакты — подберём группу по возрасту и уровню подготовки.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-muted mb-1.5">
                      Имя ученика или родителя
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Например, Анна"
                      className="w-full rounded-2xl border border-ink/15 bg-glacial px-4 py-3 text-sm text-ink outline-none focus:border-cobalt focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-muted mb-1.5">
                      Телефон или Telegram
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+7 (999) 000-00-00 или @username"
                      className="w-full rounded-2xl border border-ink/15 bg-glacial px-4 py-3 text-sm text-ink outline-none focus:border-cobalt focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-muted mb-1.5">
                        Возрастная группа
                      </label>
                      <select
                        value={ageGroup}
                        onChange={(e) => setAgeGroup(e.target.value)}
                        className="w-full rounded-2xl border border-ink/15 bg-glacial px-3.5 py-3 text-sm text-ink outline-none focus:border-cobalt"
                      >
                        <option>Ребёнок 3–6 лет</option>
                        <option>Школьник 7–15 лет</option>
                        <option>Взрослый 16+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-muted mb-1.5">
                        Направление
                      </label>
                      <input
                        type="text"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="w-full rounded-2xl border border-ink/15 bg-glacial px-3.5 py-3 text-sm text-ink outline-none focus:border-cobalt"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-full frost-btn text-white py-3.5 font-mono text-xs uppercase tracking-[0.11em] transition-all"
                  >
                    Отправить заявку
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
