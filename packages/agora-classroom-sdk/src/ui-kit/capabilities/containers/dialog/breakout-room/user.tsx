import { FC, ReactElement, useState, MouseEvent, useContext } from 'react';
import { CheckBox, transI18n } from '~ui-kit';
import { Panel, PanelStateContext } from './panel';

type UserPanelProps = {
  groupUuid: string;
  users: { userUuid: string; userName: string; groupUuid: string | undefined }[];
  limitCount: number;
  onOpen?: () => void;
  onClose?: (users: string[]) => void;
  onChange?: (users: string[]) => void;
  onError?: (message: string) => void;
};

export const UserPanel: FC<UserPanelProps> = ({
  children,
  users,
  limitCount,
  onChange,
  onOpen,
  onClose,
  onError,
  groupUuid,
}) => {
  const [checkedUsers, setCheckedUsers] = useState(() => new Set<string>());

  return (
    <Panel
      className="breakout-room-group-panel"
      trigger={children as ReactElement}
      onClose={() => {
        onClose && onClose(Array.from(checkedUsers));
      }}
      onOpen={onOpen}>
      <div
        className="panel-content py-2 overflow-scroll flex flex-wrap justify-start"
        style={{ width: 300, height: 200 }}
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
        }}>
        {users.map(({ userUuid, userName, groupUuid: userGroupUuid }) => (
          <div
            key={userUuid}
            style={{ width: '33.33%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <CheckBox
              gap={2}
              text={userName}
              value={userUuid}
              onChange={() => {
                const newCheckedUsers = new Set(checkedUsers);
                let isFull = false;
                if (newCheckedUsers.has(userUuid)) {
                  newCheckedUsers.delete(userUuid);
                } else {
                  newCheckedUsers.size < limitCount
                    ? newCheckedUsers.add(userUuid)
                    : (isFull = true);
                }
                setCheckedUsers(newCheckedUsers);
                onChange && onChange(Array.from(newCheckedUsers));
                isFull && onError && onError('FULL');
              }}
              disabled={userGroupUuid ? userGroupUuid !== groupUuid : false}
              checked={
                checkedUsers.has(userUuid) || (userGroupUuid ? userGroupUuid !== groupUuid : false)
              }
            />
          </div>
        ))}
      </div>
    </Panel>
  );
};
