'use client'

import { Download, Paperclip, FileText, File, Music, Video, Image as ImageIcon, X } from 'lucide-react'
import { useState } from 'react'

interface AttachmentPreviewProps {
  attachmentUrl: string
  attachmentName: string
  attachmentSize?: number | null
  attachmentType?: string | null
  isMine: boolean
}

export default function AttachmentPreview({
  attachmentUrl,
  attachmentName,
  attachmentSize,
  attachmentType,
  isMine
}: AttachmentPreviewProps) {
  const [imageError, setImageError] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  }

  const isImage = attachmentType?.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(attachmentName)
  const isVideo = attachmentType?.startsWith('video/') || /\.(mp4|webm|ogg|mov|avi)$/i.test(attachmentName)
  const isAudio = attachmentType?.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|aac)$/i.test(attachmentName)
  const isPdf = attachmentType === 'application/pdf' || /\.pdf$/i.test(attachmentName)
  const isDocument = attachmentType?.includes('document') ||
                     attachmentType?.includes('word') ||
                     attachmentType?.includes('text') ||
                     /\.(doc|docx|txt|csv)$/i.test(attachmentName)

  const getFileIcon = () => {
    if (isDocument) return <FileText size={20} />
    if (isPdf) return <FileText size={20} className="text-red-500" />
    if (isAudio) return <Music size={20} />
    if (isVideo) return <Video size={20} />
    if (isImage) return <ImageIcon size={20} />
    return <File size={20} />
  }

  const borderColor = isMine
    ? 'border-blue-400 bg-blue-600'
    : 'border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-600'

  return (
    <>
      <div className={`mt-2 rounded border ${borderColor} overflow-hidden`}>
        {/* Image Preview */}
        {isImage && !imageError && (
          <div
            className="cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setShowFullImage(true)}
          >
            <img
              src={attachmentUrl}
              alt={attachmentName}
              className="max-w-full h-auto max-h-80 rounded-t object-contain bg-black/5"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          </div>
        )}

        {/* Video Preview */}
        {isVideo && (
          <video
            controls
            className="max-w-full h-auto max-h-80 rounded-t bg-black"
            preload="metadata"
          >
            <source src={attachmentUrl} type={attachmentType || undefined} />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Audio Preview */}
        {isAudio && (
          <div className="p-3">
            <audio
              controls
              className="w-full"
              preload="metadata"
            >
              <source src={attachmentUrl} type={attachmentType || undefined} />
              Your browser does not support the audio tag.
            </audio>
          </div>
        )}

        {/* PDF Preview */}
        {isPdf && (
          <div className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={20} className="text-red-500" />
              <span className="text-sm font-medium">PDF Document</span>
            </div>
            <iframe
              src={`${attachmentUrl}#view=FitH`}
              className="w-full h-96 border rounded"
              title={attachmentName}
            />
          </div>
        )}

        {/* File Info and Download */}
        <div className="p-2">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {(!isImage || imageError) && !isVideo && !isAudio && !isPdf && getFileIcon()}
              <div className="flex-1 min-w-0">
                <div className="truncate text-sm font-medium" title={attachmentName}>
                  {attachmentName}
                </div>
                {attachmentSize && (
                  <div className="text-xs opacity-75">
                    {formatFileSize(attachmentSize)}
                  </div>
                )}
              </div>
            </div>
            <a
              href={attachmentUrl}
              download={attachmentName}
              className="p-1.5 hover:opacity-80 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex-shrink-0"
              title="Download"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Full Image Modal */}
      {showFullImage && isImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowFullImage(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            onClick={() => setShowFullImage(false)}
          >
            <X size={24} />
          </button>
          <img
            src={attachmentUrl}
            alt={attachmentName}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
