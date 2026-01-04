
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";

const LegalPage = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace("#", ""));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
        <section id={id} className="py-12 scroll-mt-24">
            <h2 className="editorial-heading text-3xl mb-8 text-charcoal">{title}</h2>
            <div className="prose prose-gray max-w-none text-muted-foreground">
                {children}
            </div>
            <Separator className="my-12" />
        </section>
    );

    return (
        <Layout>
            <div className="bg-[#FAFCFA] min-h-screen pb-24">
                {/* Header */}
                <div className="bg-white border-b border-black/5 pt-20 pb-12">
                    <div className="container mx-auto px-6">
                        <h1 className="editorial-heading text-4xl md:text-5xl text-charcoal mb-4">
                            Legal Policies
                        </h1>
                        <p className="text-muted-foreground max-w-2xl text-lg">
                            Transparency about how we operate, protect your data, and ensure quality.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sticky Sidebar Navigation */}
                    <div className="lg:col-span-3 hidden lg:block">
                        <div className="sticky top-24 space-y-2">
                            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Contents</p>
                            <a href="#privacy" className={`block text-sm py-2 hover:text-primary transition-colors ${hash === '#privacy' ? 'text-primary font-medium' : 'text-gray-500'}`}>Privacy Policy</a>
                            <a href="#terms" className={`block text-sm py-2 hover:text-primary transition-colors ${hash === '#terms' ? 'text-primary font-medium' : 'text-gray-500'}`}>Terms of Service</a>
                            <a href="#shipping" className={`block text-sm py-2 hover:text-primary transition-colors ${hash === '#shipping' ? 'text-primary font-medium' : 'text-gray-500'}`}>Shipping Policy</a>
                            <a href="#returns" className={`block text-sm py-2 hover:text-primary transition-colors ${hash === '#returns' ? 'text-primary font-medium' : 'text-gray-500'}`}>Returns & Refunds</a>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-8 lg:col-start-5">

                        <Section id="privacy" title="Privacy Policy">
                            <p className="mb-4 text-sm font-medium">Last updated: 04/01/2026</p>
                            <p className="mb-4">TFashion (“we”, “our”, “us”) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website, services, and products.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Information We Collect</h3>
                            <p className="mb-2">We may collect the following information:</p>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li><strong>a) Personal Information:</strong> Full name, Email address, Phone number, Shipping and billing address, Payment details (processed securely via third-party payment providers).</li>
                                <li><strong>b) Design & Usage Data:</strong> Fabric design prompts submitted by users, Generated design metadata, Browsing behavior, pages visited, and interactions.</li>
                                <li><strong>c) Technical Data:</strong> IP address, Device type, browser type, Cookies and similar tracking technologies.</li>
                            </ul>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">How We Use Your Information</h3>
                            <p className="mb-2">We use your information to:</p>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>Process and fulfill orders</li>
                                <li>Generate AI-based fabric designs</li>
                                <li>Manufacture and ship products</li>
                                <li>Communicate order updates and customer support</li>
                                <li>Improve platform performance and user experience</li>
                                <li>Comply with legal and regulatory obligations</li>
                            </ul>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">AI-Generated Designs</h3>
                            <p className="mb-4">Fabric designs generated through our AI tools are custom outputs based on your input. We do not claim ownership over your unique design output. We may store anonymized design data for quality improvement and system optimization.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Payments</h3>
                            <p className="mb-4">All payments are handled by secure, PCI-compliant third-party providers. We do not store your card or mobile money details.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Cookies</h3>
                            <p className="mb-4">We use cookies to remember user preferences, analyze traffic and performance, and enhance site functionality. You can disable cookies in your browser settings, though some features may not function properly.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Data Sharing</h3>
                            <p className="mb-4">We do not sell your personal data. We may share information with manufacturing partners (for order fulfillment only), logistics and shipping providers, payment processors, and legal authorities when required by law.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Data Security</h3>
                            <p className="mb-4">We use industry-standard security measures including encryption, access controls, and secure servers to protect your information.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Your Rights</h3>
                            <p className="mb-4">Depending on your location, you may have the right to access your personal data, request correction or deletion, or object to certain processing activities. Requests can be made via support email.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Changes to This Policy</h3>
                            <p className="mb-4">We may update this policy from time to time. Changes will be posted on this page.</p>
                        </Section>

                        <Section id="terms" title="Terms of Service">
                            <p className="mb-4 text-sm font-medium">Last updated: 04/01/2026</p>
                            <p className="mb-4">By accessing or using TFashion, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Eligibility</h3>
                            <p className="mb-4">You must be at least 18 years old or have parental/guardian consent to use this platform.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Our Services</h3>
                            <p className="mb-4">TFashion provides AI-assisted fabric design tools, Custom fabric manufacturing, and Sale and delivery of bags and related products.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Custom & AI-Generated Products</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>Custom fabrics are made to order based on user input.</li>
                                <li>Due to the nature of custom production, design previews may vary slightly from the final printed fabric.</li>
                                <li>Minor color, scale, or texture variations are industry-standard and not considered defects.</li>
                            </ul>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">User Responsibilities</h3>
                            <p className="mb-2">You agree:</p>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>Not to submit illegal, copyrighted, or offensive content</li>
                                <li>Not to misuse AI tools for prohibited purposes</li>
                                <li>That you own or have rights to any content you submit</li>
                            </ul>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Intellectual Property</h3>
                            <p className="mb-4">The TFashion platform, branding, and software are our intellectual property. You retain rights to your unique fabric designs, but grant us a license to produce them for fulfillment purposes. <strong>Additionally, users will be saving their AI designs and will be able to sell them through the licensing of their designs where other users will be downloading after purchasing a design.</strong></p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Pricing & Payments</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>All prices are displayed in KES and may change without notice.</li>
                                <li>Orders are confirmed only after successful payment.</li>
                                <li>Taxes, duties, and delivery fees may apply.</li>
                            </ul>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Order Cancellation</h3>
                            <p className="mb-4">Orders may be canceled before production begins. Once production starts, cancellations are not possible.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Limitation of Liability</h3>
                            <p className="mb-4">TFashion is not liable for indirect or consequential damages, delays caused by suppliers, customs, or force majeure events, or slight variations in custom-produced items.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Termination</h3>
                            <p className="mb-4">We reserve the right to suspend or terminate accounts for misuse, fraud, or violation of these terms.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Governing Law</h3>
                            <p className="mb-4">These terms are governed by the laws of Kenya.</p>
                        </Section>

                        <Section id="shipping" title="Shipping Policy">
                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Processing Time</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li><strong>AI Fabric Orders:</strong> 5–10 business days (design + production)</li>
                                <li><strong>Ready-Made Bags:</strong> 1–3 business days</li>
                            </ul>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Delivery Time</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li><strong>Local deliveries:</strong> 1–5 business days</li>
                                <li><strong>International deliveries:</strong> 7–21 business days</li>
                            </ul>
                            <p className="mb-4 text-sm italic">Delivery timelines may vary due to customs or courier delays.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Shipping Fees</h3>
                            <p className="mb-4">Calculated at checkout based on location and order size.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Tracking</h3>
                            <p className="mb-4">Once shipped, customers receive a tracking number via email or SMS.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Customs & Duties</h3>
                            <p className="mb-4">International customers are responsible for any customs duties or import taxes.</p>
                        </Section>

                        <Section id="returns" title="Returns & Refunds Policy">
                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Custom Fabric Products</h3>
                            <p className="mb-2">Due to the personalized nature of AI-designed fabrics, custom fabric orders are <strong>non-returnable and non-refundable</strong>, unless:</p>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>The item is damaged</li>
                                <li>The wrong item was delivered</li>
                                <li>There is a manufacturing defect</li>
                            </ul>
                            <p className="mb-4">Claims must be submitted within 48 hours of delivery with clear photos.</p>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Ready-Made Bags & Non-Custom Items</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>Returns accepted within 7 days of delivery</li>
                                <li>Items must be unused, in original condition and packaging</li>
                            </ul>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Refund Processing</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>Approved refunds are processed within 7–14 business days</li>
                                <li>Refunds are issued to the original payment method</li>
                            </ul>

                            <h3 className="text-xl font-medium text-charcoal mt-6 mb-3">Non-Refundable Items</h3>
                            <ul className="list-disc pl-5 mb-4 space-y-1">
                                <li>Custom fabrics</li>
                                <li>Clearance or discounted items</li>
                                <li>Used or damaged items not caused by us</li>
                            </ul>
                        </Section>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LegalPage;
