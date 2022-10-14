import { EduClassroomConfig, EduRoomTypeEnum, Platform } from 'agora-edu-core';
import React from 'react';
import { EduContext } from '../contexts';
import { EduClassroomUIStore } from '../stores/common';
import { EduInteractiveUIClassStore } from '../stores/interactive';
import { EduLectureUIStore } from '../stores/lecture';
import { EduLectureH5UIStore } from '../stores/lecture-h5';
import { Edu1v1ClassUIStore } from '../stores/one-on-one';
import { EduVocationalUIStore } from '../stores/vocational';
import { EduVocationalH5UIStore } from '../stores/vocational-h5';

export const use1v1UIStores = () =>
  React.useContext(EduContext.shared).oneToOneUI as Edu1v1ClassUIStore;
export const useInteractiveUIStores = () =>
  React.useContext(EduContext.shared).interactiveUI as EduInteractiveUIClassStore;
export const useLectureUIStores = () =>
  React.useContext(EduContext.shared).lectureUI as EduLectureUIStore;
export const useLectureH5UIStores = () =>
  React.useContext(EduContext.shared).lectureH5UI as EduLectureH5UIStore;
export const useVocationalUIStores = () =>
  React.useContext(EduContext.shared).vocationalUI as EduVocationalUIStore;
export const useVocationalH5UIStores = () =>
  React.useContext(EduContext.shared).vocationalH5UI as EduVocationalH5UIStore;

export function useStore(): EduClassroomUIStore {
  const oneToOneUIStores = React.useContext(EduContext.shared).oneToOneUI;
  const interactiveUIStores = React.useContext(EduContext.shared).interactiveUI;
  const lectureUIStores = React.useContext(EduContext.shared).lectureUI;
  const lectureH5UIStores = React.useContext(EduContext.shared).lectureH5UI;
  const vocationalUIStores = React.useContext(EduContext.shared).vocationalUI;
  const vocationalH5UIStores = React.useContext(EduContext.shared).vocationalH5UI;

  const type = EduClassroomConfig.shared.sessionInfo.roomType;
  const isVocational = EduClassroomConfig.shared.sessionInfo.roomServiceType !== 0;
  const isH5 = EduClassroomConfig.shared.platform === Platform.H5;
  switch (type) {
    case EduRoomTypeEnum.Room1v1Class:
      return oneToOneUIStores;
    case EduRoomTypeEnum.RoomSmallClass:
      return interactiveUIStores;
    case EduRoomTypeEnum.RoomBigClass:
      if (isVocational) {
        return isH5 ? vocationalH5UIStores : vocationalUIStores;
      } else {
        return isH5 ? lectureH5UIStores : lectureUIStores;
      }
    default:
      throw new Error(`Unsupported room type ${type}`);
  }
}
