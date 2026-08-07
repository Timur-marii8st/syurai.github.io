import ServiceLandingPage from './ServiceLandingPage';

const BusinessAIPage = ({ onBack }: { onBack: () => void }) => (
  <ServiceLandingPage kind="services" onBack={onBack} />
);

export default BusinessAIPage;
