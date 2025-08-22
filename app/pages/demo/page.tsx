// app/demo/page.tsx
"use client";
import { useState } from "react";

export default function DemoPage() {
    const steps = ["Farmer Listing", "Buyer Order", "Logistics Delivery", "Farmer Payout"];
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    return (
        <div className="p-8 max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-center">End-to-End Demo</h1>
            <Stepper steps={steps} currentStep={currentStep} />

            {/* Step content */}
            <div className="bg-white shadow rounded-xl p-6 text-center">
                {currentStep === 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">👨‍🌾 Farmer Lists Residue</h2>
                        <p>Paddy • 1200kg • Punjab • Predicted Price ₹3.8/kg</p>
                        <button
                            onClick={nextStep}
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Proceed to Buyer
                        </button>
                    </div>
                )}

                {currentStep === 1 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">🏭 Buyer Places Order</h2>
                        <p>BioFuel Co orders 1000kg • Total: ₹3900 (Escrow Payment)</p>
                        <button
                            onClick={nextStep}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Proceed to Logistics
                        </button>
                    </div>
                )}

                {currentStep === 2 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">🚜 Logistics Delivers</h2>
                        <p>GreenTruck assigned • Pickup: Punjab • Drop: Delhi • Status: Delivered ✅</p>
                        <button
                            onClick={nextStep}
                            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
                        >
                            Proceed to Payout
                        </button>
                    </div>
                )}

                {currentStep === 3 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">💰 Farmer Receives Payout</h2>
                        <p>
                            Gross: ₹10,000 <br />
                            – 2% Commission <br />
                            – Logistics Surcharge <br />
                            <span className="font-bold text-green-700">Net: ₹9,500 (UPI)</span>
                        </p>
                        <p className="mt-3 text-lg font-semibold text-green-600">Transaction Complete 🎉</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function Stepper({ steps, currentStep }: { steps: string[]; currentStep: number }) {
    return (
        <div className="flex justify-between mb-6">
            {steps.map((step, i) => (
                <div key={i} className="flex-1 text-center">
                    <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold ${
                            i <= currentStep ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"
                        }`}
                    >
                        {i + 1}
                    </div>
                    <p className={`mt-2 text-sm ${i === currentStep ? "font-bold" : "text-gray-500"}`}>
                        {step}
                    </p>
                </div>
            ))}
        </div>
    );
}
