import { observer } from 'mobx-react'
import React, { useCallback } from 'react'
import {Video} from 'agora-aclass-ui-kit'
import {useSceneStore} from '@/hooks'
import { RendererPlayer } from '@/components/media-player'
import { UserRenderer } from 'agora-rte-sdk'

export interface VideoMediaStream {
  streamUuid: string,
  userUuid: string,
  renderer?: UserRenderer,
  account: string,
  local: boolean,
  audio: boolean,
  video: boolean,
  showControls: boolean,
  placeHolderType: any,
  placeHolderText: string
}

export const TeacherVideo = observer(() => {
  const sceneStore = useSceneStore()

  const userStream = sceneStore.teacherStream as VideoMediaStream

  console.log(" ## user stream teacher ", userStream)
  
  const isLocal = userStream.local

  const handleClick = useCallback(async (type: any) => {
    const {uid} = type
    console.log(" user stream teacher ", JSON.stringify(userStream))
    if (type.sourceType === 'video') {
      if (type.enabled) {
        await sceneStore.muteVideo(uid, isLocal)
      } else {
        await sceneStore.unmuteVideo(uid, isLocal)
      }
    }
    if (type.sourceType === 'audio') {
      if (type.enabled) {
        await sceneStore.muteAudio(uid, isLocal)
      } else {
        await sceneStore.unmuteAudio(uid, isLocal)
      }
    }
  }, [userStream.video, userStream.audio, isLocal])

  const renderer = userStream.renderer

  return (
    <Video
      className={""}
      uid={+userStream.streamUuid}
      nickname={userStream.account}
      minimal={true}
      resizable={false}
      trophyNumber={0}
      visibleTrophy={false}
      role={"teacher"}
      disableButton={!isLocal}
      videoState={userStream.video}
      audioState={userStream.audio}
      onClick={handleClick}
      style={{
        width: '320px',
        maxHeight: '225px',
      }}
      placeHolderType={userStream.placeHolderType}
      placeHolderText={userStream.placeHolderText}
    >
      { userStream.renderer && userStream.video ? <RendererPlayer key={userStream.renderer && userStream.renderer.videoTrack ? userStream.renderer.videoTrack.getTrackId() : ''} track={renderer} id={userStream.streamUuid} className="rtc-video" /> : null}
    </Video>
  )
})

export const StudentVideo = observer(() => {
  const sceneStore = useSceneStore()

  const userStream = sceneStore.studentStreams[0] as VideoMediaStream
  
  const isLocal = userStream.local

  const handleClick = useCallback(async (type: any) => {
    const {uid} = type
    console.log(" user stream student ", JSON.stringify(userStream))
    if (type.sourceType === 'video') {
      if (type.enabled) {
        await sceneStore.muteVideo(uid, isLocal)
      } else {
        await sceneStore.unmuteVideo(uid, isLocal)
      }
    }
    if (type.sourceType === 'audio') {
      if (type.enabled) {
        await sceneStore.muteAudio(uid, isLocal)
      } else {
        await sceneStore.unmuteAudio(uid, isLocal)
      }
    }
  }, [userStream.video, userStream.audio, isLocal])

  const renderer = userStream.renderer

  return (
    <Video
      className={""}
      uid={+userStream.streamUuid}
      nickname={userStream.account}
      minimal={true}
      resizable={false}
      trophyNumber={0}
      visibleTrophy={false}
      role={"student"}
      videoState={userStream.video}
      audioState={userStream.audio}
      onClick={handleClick}
      style={{
        width: '320px',
        maxHeight: '225px'
      }}
      disableButton={!isLocal}
      placeHolderType={userStream.placeHolderType}
      placeHolderText={userStream.placeHolderText}
    >
      { userStream.renderer && userStream.video ? <RendererPlayer key={userStream.renderer && userStream.renderer.videoTrack ? userStream.renderer.videoTrack.getTrackId() : ''} track={renderer} id={userStream.streamUuid} className="rtc-video" /> : null}
    </Video>
  )
})