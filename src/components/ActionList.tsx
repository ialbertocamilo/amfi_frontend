import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

interface Action {
  id: string;
  name: string;
  onClick: (resourceId: string) => void;
}

interface ActionListProps {
  actions: Action[];
  resourceId: string;
}

const ActionList: React.FC<ActionListProps> = ({ actions, resourceId }) => {
  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 whitespace-nowrap">
            ...
          </Menu.Button>
        </div>
          <Menu.Items className="absolute z-50 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {actions.map((action) => (
                <Menu.Item key={action.id}>
                  {({ active }) => (
                    <button
                      onClick={() => action.onClick(resourceId)}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      {action.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
      </Menu>
    </div>
  );
};

export default ActionList;