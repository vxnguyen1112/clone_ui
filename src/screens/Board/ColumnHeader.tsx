import React, { FC, useState } from 'react';
import CheckIcon from '@atlaskit/icon/glyph/check';
import { Column } from 'shared/interfaces/Project';
import { ButtonItem, Section } from '@atlaskit/menu';
import MoreIcon from '@atlaskit/icon/glyph/editor/more';
import Popup from '@atlaskit/popup';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import InlineEdit from '@atlaskit/inline-edit';
import { Tooltip } from 'react-tippy';

interface ColumnHeaderProps {
  column: Column;
  showCheckmark: boolean;
  onChange: (value: string) => void;
  onDelete: () => void;
  onChangeCancel: () => void;
  disableDelete: boolean;
  disableDeleteMessage: string;
}

export const ColumnHeader: FC<ColumnHeaderProps> = ({
  column,
  showCheckmark,
  onChange,
  onDelete,
  disableDelete,
  disableDeleteMessage
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const deleteButton = (
    <ButtonItem onClick={onDelete} isDisabled={disableDelete}>
      Delete
    </ButtonItem>
  );

  const renderDeleteButton = () =>
    disableDelete ? (
      <Tooltip distance={-80} title={disableDeleteMessage}>
        {deleteButton}
      </Tooltip>
    ) : (
      deleteButton
    );

  return (
    <header>
      <InlineEdit
        defaultValue={column.name}
        onConfirm={onChange}
        editView={(fieldProps) => <TextField {...fieldProps} autoFocus />}
        isRequired
        readView={() => <h6 className="title">{column.name}</h6>}
      />

      {showCheckmark && (
        <span className="check-icon">
          <CheckIcon label="check" size="small" />
        </span>
      )}

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        placement="bottom-end"
        content={() => (
          <Section>
            <ButtonItem>Set column limit</ButtonItem>
            {renderDeleteButton()}
          </Section>
        )}
        trigger={(triggerProps) => (
          <Button
            {...triggerProps}
            isSelected={showPopup}
            onClick={() => setShowPopup(true)}
            className={showPopup ? 'more-icon show' : 'more-icon'}
            iconBefore={<MoreIcon size="large" label="More" />}
          />
        )}
      />
    </header>
  );
};
