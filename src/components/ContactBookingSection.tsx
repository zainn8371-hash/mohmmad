import { FormEvent, useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { buildWhatsAppUrl, SERVICES, SHOWROOM_CONFIG } from '../config/showroom';

interface ContactBookingSectionProps {
  preselectedService: string;
}

interface BookingFormState {
  customerName: string;
  phone: string;
  vehicleModel: string;
  service: string;
  message: string;
}

export function ContactBookingSection({ preselectedService }: ContactBookingSectionProps) {
  const [form, setForm] = useState<BookingFormState>({
    customerName: '',
    phone: '',
    vehicleModel: '',
    service: preselectedService || SERVICES[0].title,
    message: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<BookingFormState | null>(null);
  const [whatsappNote, setWhatsappNote] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
      setSubmittedData(null);
    }
  }, [preselectedService]);

  const buildInquiryText = (data: BookingFormState) =>
    [
      `Hello ${SHOWROOM_CONFIG.brandName},`,
      `I would like to book an inspection / service.`,
      `Name: ${data.customerName || 'Not provided'}`,
      `Phone: ${data.phone || 'Not provided'}`,
      `Vehicle: ${data.vehicleModel || 'Not provided'}`,
      `Service: ${data.service}`,
      data.message ? `Notes: ${data.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanedPhone = form.phone.replace(/[^\d+\-\s()]/g, '').trim();

    if (form.customerName.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (cleanedPhone.replace(/\D/g, '').length < 7) {
      setError('Please enter a valid contact phone number.');
      return;
    }
    if (form.vehicleModel.trim().length < 2) {
      setError('Please enter your vehicle make and model.');
      return;
    }

    setError(null);
    setSubmittedData({ ...form });
  };

  const handleWhatsAppClick = (customData?: BookingFormState) => {
    const summary = buildInquiryText(customData ?? form);
    const url = buildWhatsAppUrl(summary);
    if (url) {
      setWhatsappNote(null);
      window.location.assign(url);
    } else {
      setWhatsappNote(
        'WhatsApp business number is not yet configured in src/config/showroom.ts. Add your live phone digits to enable direct WhatsApp dispatch.'
      );
    }
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 lg:py-40 bg-[#070708] border-t border-white/10"
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Showroom Info & Direct WhatsApp Concierge */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.24em] uppercase text-[#C9A96E] mb-4">
                Contact &amp; Booking
              </p>
              <h2
                className="font-display font-medium text-[#F2F4F7] leading-[1.05] text-balance"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.6rem)' }}
              >
                LET&apos;S RESTORE YOUR VEHICLE.
              </h2>
              <p className="mt-5 text-sm sm:text-base text-[#9AA0AB] leading-relaxed max-w-md">
                Share your vehicle details and required bodywork or paint service. Our team will
                review your inquiry and arrange an in-person inspection slot.
              </p>

              {/* Prominent WhatsApp Action */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => handleWhatsAppClick()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase bg-[#C9A96E] text-[#070708] hover:bg-[#DFC38E] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC38E]"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Chat via WhatsApp</span>
                </button>
                {whatsappNote && (
                  <p className="mt-3 text-xs text-[#C9A96E] leading-relaxed max-w-md">
                    {whatsappNote}
                  </p>
                )}
              </div>
            </div>

            {/* Configurable Showroom Contact Details (Zero Fabricated Details) */}
            <div className="mt-12 pt-8 border-t border-white/10 space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-[#C9A96E] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs tracking-[0.18em] uppercase text-[#8F96A3]">
                    Showroom Address
                  </p>
                  <p className="mt-1 text-sm text-[#E6E8EC]">{SHOWROOM_CONFIG.addressDisplay}</p>
                  {SHOWROOM_CONFIG.mapsUrl ? (
                    <a
                      href={SHOWROOM_CONFIG.mapsUrl}
                      className="inline-block mt-1 text-xs text-[#C9A96E] hover:underline"
                    >
                      Open in Google Maps
                    </a>
                  ) : (
                    <p className="mt-1 text-xs text-[#7F8694]">
                      Google Maps location link placeholder
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-4 h-4 text-[#C9A96E] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs tracking-[0.18em] uppercase text-[#8F96A3]">
                    Phone &amp; WhatsApp
                  </p>
                  <a
                    href={`tel:${SHOWROOM_CONFIG.phoneDisplay}`}
                    className="mt-1 inline-block text-sm text-[#E6E8EC] hover:text-[#C9A96E] transition-colors font-mono-tabular"
                  >
                    {SHOWROOM_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-4 h-4 text-[#C9A96E] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs tracking-[0.18em] uppercase text-[#8F96A3]">Email</p>
                  <a
                    href={`mailto:${SHOWROOM_CONFIG.email}`}
                    className="mt-1 inline-block text-sm text-[#E6E8EC] hover:text-[#C9A96E] transition-colors break-all"
                  >
                    {SHOWROOM_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-4 h-4 text-[#C9A96E] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs tracking-[0.18em] uppercase text-[#8F96A3]">
                    Opening Hours
                  </p>
                  <p className="mt-1 text-sm text-[#E6E8EC]">{SHOWROOM_CONFIG.openingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Service Request Form */}
          <div className="lg:col-span-7 bg-[#0E0F12] border border-white/10 p-6 sm:p-10">
            {submittedData ? (
              <div className="py-8 space-y-6">
                <div className="flex items-center gap-3 text-[#C9A96E]">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                    Inquiry Prepared
                  </span>
                </div>
                <h3 className="font-display text-3xl text-[#F2F4F7]">
                  Thank you, {submittedData.customerName}.
                </h3>
                <p className="text-sm sm:text-base text-[#A5ACB8] leading-relaxed">
                  Your booking request for{' '}
                  <span className="text-[#E6E8EC]">{submittedData.vehicleModel}</span> ({' '}
                  <span className="text-[#C9A96E]">{submittedData.service}</span>) has been
                  recorded. You may also forward this summary directly to our showroom WhatsApp
                  desk.
                </p>

                <div className="p-5 bg-[#070708] border border-white/10 text-xs sm:text-sm text-[#C8CDD6] space-y-2">
                  <p>
                    <span className="text-[#8F96A3]">Phone:</span>{' '}
                    <span className="font-mono-tabular">{submittedData.phone}</span>
                  </p>
                  <p>
                    <span className="text-[#8F96A3]">Vehicle:</span> {submittedData.vehicleModel}
                  </p>
                  <p>
                    <span className="text-[#8F96A3]">Service:</span> {submittedData.service}
                  </p>
                  {submittedData.message && (
                    <p>
                      <span className="text-[#8F96A3]">Notes:</span> {submittedData.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => handleWhatsAppClick(submittedData)}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.15em] uppercase bg-[#C9A96E] text-[#070708] hover:bg-[#DFC38E] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Send via WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedData(null);
                      setForm({
                        customerName: '',
                        phone: '',
                        vehicleModel: '',
                        service: SERVICES[0].title,
                        message: '',
                      });
                    }}
                    className="px-6 py-3.5 text-xs font-semibold tracking-[0.15em] uppercase border border-white/15 text-[#E6E8EC] hover:border-white/35 transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="border-b border-white/10 pb-5">
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#F2F4F7]">
                    Request Service Inspection
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#9AA0AB]">
                    Complete the fields below to schedule your vehicle evaluation.
                  </p>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="p-4 bg-[#261414] border border-[#E57373]/40 text-xs sm:text-sm text-[#F5B7B7]"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="customer-name"
                      className="block text-xs tracking-[0.16em] uppercase text-[#A5ACB8] mb-2"
                    >
                      Customer Name
                    </label>
                    <input
                      id="customer-name"
                      name="customerName"
                      type="text"
                      required
                      value={form.customerName}
                      onChange={(e) => setForm((p) => ({ ...p, customerName: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full px-4 py-3.5 text-sm bg-[#070708] border border-white/15 text-[#F2F4F7] placeholder:text-[#686E7A] focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customer-phone"
                      className="block text-xs tracking-[0.16em] uppercase text-[#A5ACB8] mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="customer-phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="Your contact number"
                      className="w-full px-4 py-3.5 text-sm bg-[#070708] border border-white/15 text-[#F2F4F7] placeholder:text-[#686E7A] focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="vehicle-model"
                      className="block text-xs tracking-[0.16em] uppercase text-[#A5ACB8] mb-2"
                    >
                      Vehicle Make &amp; Model
                    </label>
                    <input
                      id="vehicle-model"
                      name="vehicleModel"
                      type="text"
                      required
                      value={form.vehicleModel}
                      onChange={(e) => setForm((p) => ({ ...p, vehicleModel: e.target.value }))}
                      placeholder="e.g. Porsche 911 / Mercedes C-Class"
                      className="w-full px-4 py-3.5 text-sm bg-[#070708] border border-white/15 text-[#F2F4F7] placeholder:text-[#686E7A] focus:outline-none focus:border-[#C9A96E] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="required-service"
                      className="block text-xs tracking-[0.16em] uppercase text-[#A5ACB8] mb-2"
                    >
                      Required Service
                    </label>
                    <select
                      id="required-service"
                      name="service"
                      value={form.service}
                      onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                      className="w-full px-4 py-3.5 text-sm bg-[#070708] border border-white/15 text-[#F2F4F7] focus:outline-none focus:border-[#C9A96E] transition-colors"
                    >
                      {SERVICES.map((svc) => (
                        <option key={svc.id} value={svc.title}>
                          {svc.index} — {svc.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-message"
                    className="block text-xs tracking-[0.16em] uppercase text-[#A5ACB8] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="booking-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Describe the dent, scratch, panel damage, or desired paint finish..."
                    className="w-full px-4 py-3.5 text-sm bg-[#070708] border border-white/15 text-[#F2F4F7] placeholder:text-[#686E7A] focus:outline-none focus:border-[#C9A96E] transition-colors resize-y"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-[#7F8694]">
                    All inquiries are reviewed directly by the showroom desk.
                  </p>
                  <button
                    type="submit"
                    className="px-8 py-4 text-xs font-semibold tracking-[0.16em] uppercase bg-[#C9A96E] text-[#070708] hover:bg-[#DFC38E] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC38E]"
                  >
                    Book Your Service
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
