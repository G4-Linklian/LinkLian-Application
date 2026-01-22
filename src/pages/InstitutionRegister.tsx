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
  { label: 'เข้าสู่ระบบ', description: 'เริ่มต้นใช้งาน' },
];

type EmailStatus = 'new' | 'pending' | 'approved';
type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export default function InstitutionRegister() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('new');
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>('pending');
  const [rejectionReason, setRejectionReason] = useState('');

  const handleEmailSubmit = (submittedEmail: string, status: EmailStatus) => {
    setEmail(submittedEmail);
    setEmailStatus(status);
    
    if (status === 'approved') {
      setApprovalStatus('approved');
      setCurrentStep(4);
    } else if (status === 'pending') {
      setApprovalStatus('pending');
      setCurrentStep(3);
    } else {
      setCurrentStep(2);
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
    setCurrentStep(4);
  };

  const handleApprovalStatusChange = (newStatus: ApprovalStatus) => {
    setApprovalStatus(newStatus);
    if (newStatus === 'approved') {
      setCurrentStep(4);
    }
  };

  const handleResubmit = () => {
    setApprovalStatus('pending');
    setRejectionReason('');
    setCurrentStep(2);
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
            initialStatus={approvalStatus}
            rejectionReason={rejectionReason}
            onNext={handleApprovalNext}
            onStatusChange={handleApprovalStatusChange}
            onResubmit={handleResubmit}
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
        {/* Header with Login Link */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
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
