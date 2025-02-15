
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PatientInfoFormProps {
  patientName: string;
  patientId: string;
  onPatientNameChange: (value: string) => void;
  onPatientIdChange: (value: string) => void;
}

const PatientInfoForm = ({
  patientName,
  patientId,
  onPatientNameChange,
  onPatientIdChange,
}: PatientInfoFormProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="patientName">Patient Name</Label>
        <Input
          id="patientName"
          value={patientName}
          onChange={(e) => onPatientNameChange(e.target.value)}
          placeholder="Enter patient name"
          className="transition-all duration-200 hover:border-primary/50"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="patientId">Patient ID</Label>
        <Input
          id="patientId"
          value={patientId}
          onChange={(e) => onPatientIdChange(e.target.value)}
          placeholder="Enter patient ID"
          className="transition-all duration-200 hover:border-primary/50"
        />
      </div>
    </div>
  );
};

export default PatientInfoForm;
