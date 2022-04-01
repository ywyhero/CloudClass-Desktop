//@ts-nocheck
import {
  ChatEvent,
  ChatListType,
  Conversation,
  EduClassroomUIStore,
  EduRoomTypeEnum,
  IAgoraWidget,
  MessageItem,
  EduClassroomConfig,
} from 'agora-edu-core';
import classnames from 'classnames';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { ChatNew, I18nProvider, SimpleChatNew } from '~ui-kit';
import { Context } from './chatContext';
import { WidgetChatUIStore } from './chatStore';

const App = observer(() => {
  const chatContext = useContext(Context);
  const uiStore = chatContext.uiStore as EduClassroomUIStore;
  const widgetStore = chatContext.widgetStore as WidgetChatUIStore;
  const loading = uiStore.layoutUIStore.loading;
  const defaultMinimize = widgetStore.minimize;

  const {
    roomChatMessages: messageList,
    unmuted: canChatting,
    isHost,
    convertedConversationList: conversationList,
    unreadMessageCount,
    unReadCount,
    configUI,
    minimize,
  } = widgetStore;

  const {
    sendText: handleSendText,
    onCanChattingChange,
    refreshMessageList,
    refreshConversationList,
    refreshConversationMessageList,
    updateActiveTab,
    unreadConversationCountFn,
    toggleChatMinimize,
  } = widgetStore;

  useEffect(() => {
    if (loading) return;
    refreshMessageList();
    if (widgetStore.classroomConfig.sessionInfo.role === 1) {
      // refresh conv list for teacher
      refreshConversationList();
    }
  }, [loading]);

  return (
    <div
      id="netless-white"
      style={{ display: 'flex', width: '100%', height: '100%' }}
      className={`rtm-chat rtm-chat-${widgetStore.classroomConfig.sessionInfo.roomType}`}>
      {widgetStore.classroomConfig.sessionInfo.roomType === 0 ? (
        // display simple chat for 1v1
        <SimpleChatNew
          className="simple-chat"
          collapse={minimize}
          onCanChattingChange={onCanChattingChange}
          canChatting={canChatting}
          isHost={isHost}
          uid={widgetStore.classroomConfig.sessionInfo.userUuid}
          messages={messageList.map((message: MessageItem) => message.toMessage())}
          onCollapse={() => {
            toggleChatMinimize();
          }}
          onSend={handleSendText}
          showCloseIcon={false}
          onPullRefresh={() => {
            refreshMessageList();
          }}
          unreadCount={unreadMessageCount}
          configUI={configUI}
          unreadCountMsg={0}
        />
      ) : (
        <ChatNew
          className={classnames('small-class-chat', { 'small-class-chat-fixed': !minimize })}
          collapse={minimize}
          onCanChattingChange={onCanChattingChange}
          canChatting={canChatting}
          isHost={isHost}
          uid={widgetStore.classroomConfig.sessionInfo.userUuid}
          messages={widgetStore.convertedMessageList}
          unReadMessageCount={unReadCount}
          unreadConversationCountFn={unreadConversationCountFn}
          activeTab={widgetStore.activeTab}
          onCollapse={() => {
            toggleChatMinimize();
          }}
          onSend={handleSendText}
          showCloseIcon={defaultMinimize}
          onPullRefresh={(evt: ChatEvent) => {
            if (evt.type === 'conversation' && evt.conversation) {
              refreshConversationMessageList(evt.conversation);
            } else if (evt.type === 'conversation-list') {
              refreshConversationList();
            } else {
              refreshMessageList();
            }
          }}
          onChangeActiveTab={(activeTab: ChatListType, conversation?: Conversation) => {
            updateActiveTab(activeTab, conversation);
          }}
          unreadCount={unreadMessageCount}
          singleConversation={
            widgetStore.classroomConfig.sessionInfo.role === 2 ? conversationList[0] : undefined
          }
          conversations={conversationList}
          configUI={configUI}
        />
      )}
    </div>
  );
});

export class AgoraChatWidget implements IAgoraWidget {
  widgetId = 'io.agora.widget.chat';

  constructor(private _classroomConfig: EduClassroomConfig) {}

  widgetDidLoad(dom: Element, props: any): void {
    const widgetStore = new WidgetChatUIStore(props.uiStore, this._classroomConfig);
    ReactDOM.render(
      <Context.Provider value={{ uiStore: props.uiStore, widgetStore }}>
        <I18nProvider language={props.language}>
          <App />
        </I18nProvider>
      </Context.Provider>,
      dom,
    );
  }

  widgetWillUnload(): void {}
}
