import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import RegistrationProgress from '@/components/registration/RegistrationProgress';
import StepEmail from '@/components/registration/StepEmail';
import StepRegistrationForm from '@/components/registration/StepRegistrationForm';
import StepPendingApproval, { ApprovalStatus } from '@/components/registration/StepPendingApproval';
import StepUserGuide from '@/components/registration/StepUserGuide';

const LOGO_PATH = "/logo.png";

const steps = [
  { label: 'อีเมล', description: 'ยืนยันอีเมล' },
  { label: 'ข้อมูลสถาบัน', description: 'กรอกรายละเอียด' },
  { label: 'รอการอนุมัติ', description: 'ตรวจสอบข้อมูล' },
  { label: 'คู่มือการใช้งาน', description: 'เริ่มต้นใช้งาน' },
];

type EmailStatus = 'new' | 'pending' | 'approved' | 'rejected';

export default function InstitutionRegister() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('new');
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>('pending');
  const [rejectionReason, setRejectionReason] = useState<string>('');

  const handleEmailSubmit = (submittedEmail: string, status: EmailStatus) => {
    setEmail(submittedEmail);
    setEmailStatus(status);
    
    // Navigate to appropriate step based on status
    if (status === 'approved') {
      setApprovalStatus('approved');
      setCurrentStep(4); // Go to user guide
    } else if (status === 'pending') {
      setApprovalStatus('pending');
      setCurrentStep(3);
    } else if (status === 'rejected') {
      setApprovalStatus('rejected');
      setRejectionReason('เอกสารประกอบการสมัครไม่ครบถ้วน'); // This will come from backend
      setCurrentStep(3);
    } else {
      setCurrentStep(2); // Go to registration form
    }
  };

  const handleRegistrationSubmit = () => {
    setApprovalStatus('pending');
    setCurrentStep(3);
  };

  const handleBackToEmail = () => {
    setCurrentStep(1);
    setEmail('');
    setEmailStatus('new');
    setApprovalStatus('pending');
    setRejectionReason('');
  };

  const handleApprovalNext = () => {
    if (approvalStatus === 'approved') {
      setCurrentStep(4);
    }
  };

  const handleRetry = () => {
    setCurrentStep(2);
    setApprovalStatus('pending');
    setRejectionReason('');
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
            status={approvalStatus}
            rejectionReason={rejectionReason}
            onNext={handleApprovalNext}
            onRetry={handleRetry}
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
