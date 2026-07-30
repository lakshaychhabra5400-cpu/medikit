import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { Button, Card, Input } from "../components/Ui";

const defaultResult = null;

export default function PrescriptionUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileText, setFileText] = useState("");
  const [result, setResult] = useState(defaultResult);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const readTextFile = (file) =>
    new Promise((resolve, reject) => {
      if (!file) return resolve("");
      if (file.type.startsWith("text/") || /\.(txt|md)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result || "");
        reader.onerror = () => reject(new Error("Unable to read text file."));
        reader.readAsText(file);
      } else {
        resolve("");
      }
    });

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setFileName("");
      setFileType("");
      setFileText("");
      return;
    }
    setSelectedFile(file);
    setFileName(file.name);
    setFileType(file.type || file.name.split(".").pop());
    try {
      const text = await readTextFile(file);
      setFileText(text);
    } catch (err) {
      setFileText("");
    }
    setResult(defaultResult);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please choose an image or document to upload.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(defaultResult);
    try {
      const response = await fetch("/api/prescriptions/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName, fileType, fileText }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.message || "Upload failed.");
      setResult(body);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page upload-prescription-page">
      <div className="crumb">Home › Upload Prescription</div>
      <h1>Upload your prescription</h1>
      <p>
        Choose a medicine image or document and Medkit will scan the
        prescription to suggest the medicine name and its uses. Follow your
        doctor’s schedule for dosage.
      </p>

      <Card className="upload-card">
        <form onSubmit={handleSubmit}>
          <label className="field file-field">
            <span>Select image or document</span>
            <input
              type="file"
              accept="image/*,.pdf,.txt,.md"
              onChange={handleFileChange}
            />
            <small>
              {selectedFile
                ? selectedFile.name
                : "PNG, JPG, PDF, or text file accepted"}
            </small>
          </label>
          <label className="field">
            <span>Detected medicine text (optional)</span>
            <textarea
              value={fileText}
              onChange={(e) => setFileText(e.target.value)}
              placeholder="Paste medicine name or prescription text here"
              rows="4"
            />
          </label>
          {error && <p className="field-error">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? (
              "Scanning..."
            ) : (
              <>
                <FiUpload /> Upload and scan
              </>
            )}
          </Button>
        </form>
      </Card>

      {result && (
        <Card className="prescription-result">
          <h2>Prescription summary</h2>
          <p>
            <strong>Medicine name:</strong> {result.medicineName}
          </p>
          <p>
            <strong>Uses:</strong> {result.uses}
          </p>
          <p>
            <strong>Advice:</strong> {result.instructions}
          </p>
        </Card>
      )}
    </div>
  );
}
