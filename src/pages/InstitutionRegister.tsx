import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import RegistrationProgress from '@/components/registration/RegistrationProgress';
import StepEmail from '@/components/registration/StepEmail';
import StepRegistrationForm from '@/components/registration/StepRegistrationForm';
import StepPendingApproval from '@/components/registration/StepPendingApproval';
import StepUserGuide from '@/components/registration/StepUserGuide';

const LOGO_PATH = "/logo.png";

const steps = [
  { label: 'อีเมล', description: 'ยืนยันอีเมล' },
  { label: 'ข้อมูลสถาบัน', description: 'กรอกรายละเอียด' },
  { label: 'รอการอนุมัติ', description: 'ตรวจสอบข้อมูล' },
  { label: 'คู่มือการใช้งาน', description: 'เริ่มต้นใช้งาน' },
];

type EmailStatus = 'new' | 'pending' | 'approved';

export default function InstitutionRegister() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('new');
  const [isApproved, setIsApproved] = useState(false);

  const handleEmailSubmit = (submittedEmail: string, status: EmailStatus) => {
    setEmail(submittedEmail);
    setEmailStatus(status);
    
    // Navigate to appropriate step based on status
    if (status === 'approved') {
      setIsApproved(true);
      setCurrentStep(4); // Go to user guide
    } else if (status === 'pending') {
      // Email is already registered but pending approval - go to step 3
      setIsApproved(false);
      setCurrentStep(3); // Go to pending approval (cannot proceed to step 4)
    } else {
      setCurrentStep(2); // Go to registration form
    }
  };

  const handleRegistrationSubmit = () => {
    setIsApproved(false); // Just registered, not approved yet
    setCurrentStep(3); // Go to pending approval
  };

  const handleBackToEmail = () => {
    setCurrentStep(1);
    setEmail('');
    setEmailStatus('new');
    setIsApproved(false);
  };

  const handleApprovalNext = () => {
    // Only allow going to step 4 if approved
    if (isApproved) {
      setCurrentStep(4);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepEmail onNext={handleEmailSubmit} />;
      case 2:
        return (
          <StepRegistrationForm
            email={email}
            onNext={handleRegistrationSubmit}
            onBack={handleBackToEmail}
          />
        );
      case 3:
        return (
          <StepPendingApproval
            email={email}
            isApproved={isApproved}
            onNext={handleApprovalNext}
            onApprovalChange={setIsApproved}
          />
        );
      case 4:
        return <StepUserGuide email={email} />;
      default:
        return <StepEmail onNext={handleEmailSubmit} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-12"
        >
          <Link to="/" className="flex items-center group">
            <img
              src={LOGO_PATH}
              alt="LinkLian"
              className="h-14 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </motion.header>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <RegistrationProgress currentStep={currentStep} steps={steps} />
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
}
