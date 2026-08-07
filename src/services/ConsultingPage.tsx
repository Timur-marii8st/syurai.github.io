import ServiceLandingPage from './ServiceLandingPage';

const ConsultingPage = ({ onBack }: { onBack: () => void }) => (
  <ServiceLandingPage kind="consulting" onBack={onBack} />
);

export default ConsultingPage;
