import React from 'react'
import ClickBinary from '../animations/ClickBinary'

const Grid = () => {
  return (
    <div className="grid grid-cols-4 gap-4 px-50">
      <EffectCard title="1" Wrapper={ClickBinary} />
      <EffectCard title="2" />
      <EffectCard title="3" />
      <EffectCard title="4" />
      <EffectCard title="5" />
      <EffectCard title="6" />
      <EffectCard title="7" />
      <EffectCard title="8" />
      <EffectCard title="9" />
      <EffectCard title="10" />
      <EffectCard title="10" />
      <EffectCard title="10" />
</div>
  )
}

export default Grid

// const EffectCard = ({title}) => {
//   return (
//     <div className="group flex flex-col space-y-3 cursor-default">
//       {/* Label Row */}
//       <div className="flex items-center h-4">
//         <span className="text-[10px] font-mono tracking-[0.15em] font-bold text-[#555] group-hover:text-white transition-colors duration-200">
//           {title}
//         </span>
//       </div>
//         {Wrapper ? <Wrapper>
//         <div className="relative w-40 aspect-[1.3/1] border border-[#151515] bg-[#050505] transition-colors duration-300 flex items-center justify-center group-hover:border-[#333] group-hover:bg-[#0a0a0a]">
          
//         {/* L-Shaped Corner Accents - Visible only on group hover */}
//         <div className="absolute top-0 left-0 w-[6px] h-[6px] border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//         <div className="absolute bottom-0 right-0 w-[6px] h-[6px] border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

//         {/* Interior Label - Hidden on group hover */}
//         <span className="text-[9px] font-mono tracking-[0.2em] text-[#222] opacity-100 group-hover:opacity-0 transition-opacity duration-300">
//           CLICK
//         </span>
//         </div>
//       </Wrapper> : content}
//     </div>
//   )
// }

const EffectCard = ({ title, Wrapper }) => {

  const content = (
    <div className="relative w-40 aspect-[1.3/1] border border-[#151515] bg-[#050505] transition-colors duration-300 flex items-center justify-center group-hover:border-[#333] group-hover:bg-[#0a0a0a]">
      
      {/* Corners */}
      <div className="absolute top-0 left-0 w-[6px] h-[6px] border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="absolute bottom-0 right-0 w-[6px] h-[6px] border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Text */}
      <span className="text-[9px] font-mono tracking-[0.2em] text-[#222] opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        CLICK
      </span>
    </div>
  );

  return (
    <div className="group flex flex-col space-y-3 cursor-default">
      
      {/* Title */}
      <div className="flex items-center h-4">
        <span className="text-[10px] font-mono tracking-[0.15em] font-bold text-[#555] group-hover:text-white transition-colors duration-200">
          {title}
        </span>
      </div>

      {/* Apply wrapper ONLY if provided */}
      {Wrapper ? <Wrapper>{content}</Wrapper> : content}

    </div>
  );
};


const CardBox = () => {
  return(
    <div className="relative w-40 aspect-[1.3/1] border border-[#151515] bg-[#050505] transition-colors duration-300 flex items-center justify-center hover:border-[#333] hover:bg-[#0a0a0a]">
        
      {/* L-Shaped Corner Accents - Visible only on group hover */}
      <div className="absolute top-0 left-0 w-[6px] h-[6px] border-t border-l border-white opacity-0 hover:opacity-100 transition-opacity duration-200" />
      <div className="absolute bottom-0 right-0 w-[6px] h-[6px] border-b border-r border-white opacity-0 hover:opacity-100 transition-opacity duration-200" />

      {/* Interior Label - Hidden on group hover */}
      <span className="text-[9px] font-mono tracking-[0.2em] text-[#222] opacity-100 hover:opacity-0 transition-opacity duration-300">
        CLICK
      </span>
    </div>
  )
}
