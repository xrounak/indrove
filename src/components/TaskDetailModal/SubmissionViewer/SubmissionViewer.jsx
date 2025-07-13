import React from 'react';
import EmptyState from '../../../features/Hire/1Dashboard/EmptyState/EmptyState';
import styles from './SubmissionViewer.module.css';

export default function SubmissionViewer({ submission, onDownload }) {
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      case 'zip':
      case 'rar':
        return '📦';
      default:
        return '📎';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Check if submission has any content
  const hasFiles = submission?.files && submission.files.length > 0;
  const hasNotes = submission?.notes && submission.notes.trim().length > 0;
  const hasSubmission = hasFiles || hasNotes;

  if (!hasSubmission) {
    return (
      <div className={styles.container}>
        <h3 className={styles.sectionTitle}>Submission</h3>
        <EmptyState
          icon="📤"
          title="No Submission Content"
          description="The freelancer hasn't submitted any files or notes yet. The submission may be incomplete."
          variant="submissions"
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Submission</h3>
      
      <div className={styles.submissionContent}>
        {hasFiles && (
          <div className={styles.filesSection}>
            <h4 className={styles.subsectionTitle}>Submitted Files</h4>
            <div className={styles.filesList}>
              {submission.files.map((file, index) => (
                <div key={index} className={styles.fileItem}>
                  <div className={styles.fileIcon}>
                    {getFileIcon(file.name)}
                  </div>
                  <div className={styles.fileInfo}>
                    <div className={styles.fileName}>{file.name}</div>
                    <div className={styles.fileSize}>
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                  <button 
                    className={styles.downloadFileBtn}
                    onClick={() => onDownload(file)}
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {hasNotes && (
          <div className={styles.notesSection}>
            <h4 className={styles.subsectionTitle}>Freelancer Notes</h4>
            <div className={styles.notesContent}>
              {submission.notes}
            </div>
          </div>
        )}
        
        {submission.submittedAt && (
          <div className={styles.submissionMeta}>
            <span className={styles.submissionDate}>
              Submitted on: {new Date(submission.submittedAt).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
} 