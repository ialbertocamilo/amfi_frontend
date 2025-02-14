'use client'

import { ProjectStatus } from '@/mappers/project.mapper'
import { Button, Tooltip } from '@mui/material'
import { motion } from 'framer-motion'
import { Pause, Play, Square } from 'lucide-react'
import { useEffect, useState } from 'react'
import CustomModal from '../CustomModal'

type PlaybackState = 'playing' | 'paused' | 'stopped' | 'draft' | 'finished'

interface PlaybackControlProps {
  status: ProjectStatus;
  onStatusChange?: (status: ProjectStatus) => void;
}

export default function PlaybackControl({ status, onStatusChange }: PlaybackControlProps) {
  const [playbackState, setPlaybackState] = useState<PlaybackState>('stopped')
  const [showPlayModal, setShowPlayModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)

  useEffect(() => {
    switch (status) {
      case ProjectStatus.Draft:
        setPlaybackState('draft');
        break;
      case ProjectStatus.InProgress:
        setPlaybackState('playing');
        break;
      case ProjectStatus.Paused:
        setPlaybackState('paused');
        break;
      case ProjectStatus.Closed:
        setPlaybackState('stopped');
        break;
      case ProjectStatus.Finished:
        setPlaybackState('finished');
        break;
    }
  }, [status])

  const handlePlayClick = () => {
    setShowPlayModal(true);
  }

  const confirmPlay = () => {
    setPlaybackState('playing');
    onStatusChange?.(ProjectStatus.InProgress);
    setShowPlayModal(false);
  }

  const handlePause = () => {
    setPlaybackState('paused');
    onStatusChange?.(ProjectStatus.Paused);
  }

  const handleStop = () => {
    setShowCancelModal(true);
  }

  const confirmStop = () => {
    setPlaybackState('stopped');
    onStatusChange?.(ProjectStatus.Closed);
    setShowCancelModal(false);
  }

  const buttonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring', stiffness: 500, damping: 30 }
  }

  return (
    <div className="flex items-center space-x-2">
      {playbackState !== 'stopped' ? (
        <>
          {playbackState === 'draft' && (
            <motion.div key="play" {...buttonVariants}>
              <Tooltip title="Iniciar - Comenzar el proyecto" arrow placement="top">
                <Button
                  onClick={handlePlayClick}
                  variant="outlined"
                  size="small"
                  className="transition-colors duration-300 hover:bg-green-100 rounded-xl"
                >
                  <Play className="h-6 w-6 text-green-600" />
                  <span className="sr-only">Play</span>
                </Button>
              </Tooltip>
            </motion.div>
          )}
          {(playbackState === 'playing' || playbackState === 'paused') && (
            <>
              {playbackState === 'playing' ? (
                <motion.div key="pause" {...buttonVariants}>
                  <Tooltip title="Pausar - Detener temporalmente" arrow placement="top">
                    <Button
                      onClick={handlePause}
                      variant="outlined"
                      size="small"
                      className="transition-colors duration-300 hover:bg-yellow-100 rounded-xl"
                    >
                      <Pause className="h-6 w-6 text-yellow-600" />
                      <span className="sr-only">Pause</span>
                    </Button>
                  </Tooltip>
                </motion.div>
              ) : (
                <motion.div key="play" {...buttonVariants}>
                  <Tooltip title="Reanudar proyecto" arrow placement="top">
                    <Button
                      onClick={handlePlayClick}
                      variant="outlined"
                      size="small"
                      className="transition-colors duration-300 hover:bg-green-100 rounded-xl"
                    >
                      <Play className="h-6 w-6 text-green-600" />
                      <span className="sr-only">Play</span>
                    </Button>
                  </Tooltip>
                </motion.div>
              )}

              <motion.div key="stop" {...buttonVariants}>
                <Tooltip title="Detener - Cancelar el proyecto" arrow placement="top">
                  <Button
                    onClick={handleStop}
                    variant="outlined"
                    size="small"
                    className="transition-colors duration-300 hover:bg-red-100 rounded-xl"
                  >
                    <Square className="h-6 w-6 text-red-600" />
                    <span className="sr-only">Stop</span>
                  </Button>
                </Tooltip>
              </motion.div>
            </>
          )}
        </>
      ) : (
        <motion.div key="stopped" {...buttonVariants}>
          <Tooltip title="Proyecto cerrado" arrow placement="top">
            <Button
              variant="outlined"
              size="small"
              disabled
              className="transition-colors duration-300 rounded-xl"
            >
              <Square className="h-6 w-6 text-gray-400" />
              <span className="sr-only">Cerrado</span>
            </Button>
          </Tooltip>
        </motion.div>
      )}

      <CustomModal
        isOpen={showPlayModal}
        onCancel={() => setShowPlayModal(false)}
        onConfirm={confirmPlay}
        title="Iniciar proyecto"
        message="¿Está seguro que desea iniciar el proyecto? Esto activará el flujo de trabajo del proyecto y permitirá que los participantes comiencen sus actividades."
        confirmText="Sí, iniciar"
        cancelText="No, cancelar"
      />

      <CustomModal
        isOpen={showCancelModal}
        onCancel={() => setShowCancelModal(false)}
        onConfirm={confirmStop}
        title="Cerrar proyecto"
        message="¿Está seguro que desea cerrar el proyecto? Esta acción no se puede deshacer."
        confirmText="Sí, cerrar"
        cancelText="No, continuar"
      />
    </div>
  )
}