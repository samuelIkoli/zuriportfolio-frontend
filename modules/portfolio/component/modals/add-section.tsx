'use client';
import React, { useContext } from 'react';
import Modal from '@ui/Modal';
import { Briefcase, CloseSquare } from 'iconsax-react';
import Portfolio from '../../../../context/PortfolioLandingContext';

function Home() {
  const { isOpen, onClose, toggleSection, sections, userSections, setUserData } = useContext(Portfolio);

  const nonMatchingSections = sections.filter((section) => {
    return !userSections.some((selected) => {
      return section.title === selected.title && selected?.data && selected?.data?.length >= 1;
    });
  });

  return (
    <>
      <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xxl">
        <div className=" bg-white-100 p-3 py-5 rounded-lg">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-4xl sm:text-[1.5rem] text-[#2E3130] font-manropeL font-bold leading-10">
                Add a section
              </p>
              <CloseSquare
                size="32"
                color="#009254"
                variant="Bold"
                onClick={() => {
                  onClose();
                  setUserData((p: any) => ({ ...p, showBuildPortfolio: false }));
                }}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {nonMatchingSections.map((section, i) => {
              return (
                <div
                  key={i}
                  className="bg-[#F4FBF6] p-4 rounded-lg cursor-pointer hover:border-2 hover:border-green-500 border-2 border-transparent"
                  onClick={() => toggleSection(section.title)}
                >
                  <div className="flex gap-2 items-center text-green-500">
                    {section.icon}
                    <h2 className="text-black leading-6 text-base font-medium">{section.title}</h2>
                  </div>
                  <div>
                    <p className="text-[#444846] mt-2">{section.description}</p>
                  </div>
                </div>
              );
            })}

            <div
              className="bg-[#ffffff] p-4 rounded-lg flex items-center cursor-pointer border border-green-500 border-dashed hover:border-2 hover:border-green-500"
              onClick={() => toggleSection('custom')}
            >
              <div>
                <div className="flex gap-2">
                  <Briefcase className="mt-1 text-green-500" />
                  <h2 className="font-bold text-black leading-6 text-base">Custom</h2>
                </div>
                <p>You didn’t find what you’re looking for? Make a custom section</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Home;
