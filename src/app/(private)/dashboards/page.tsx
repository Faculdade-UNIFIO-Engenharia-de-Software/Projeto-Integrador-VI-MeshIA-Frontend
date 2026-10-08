'use client'

import { Folder } from "@/components/customized-components/folder"
import { Separator } from "@/components/ui/separator";
import {ChartNoAxesColumnDecreasing, FolderOpen, Plus, Settings} from "lucide-react";

import { dashboads, type TDashboards } from "@/actions/dashboards/artefact/dashboards";
import { Button } from "@/components/ui/button";


export default function Dashboards() {
  return (
    <>
      <div id="title">
        <h4 className="flex gap-2">
          <ChartNoAxesColumnDecreasing />
          Workspace Dashoards
        </h4>
        <p className="text-muted-foreground mt-1 mb-6">Acesse as dashboards da sua organização</p>
        <Separator/>
      </div>
      <div className="flex gap-4 justify-between">
        <Button>
          <Plus/>
          Adicionar
        </Button>
        <Button variant="secondary">
          <Settings/>
          Gerenciar Acessos
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-8">
        {dashboads.map((item, index) => (
          <Folder
            key={index}
            variant="link"
            icon={<FolderOpen />}
            size="md"
            href={`/dashboards/${index}`}
          >
            {item.workspace}
          </Folder>
        ))}
      </div>
    </>
  )
}
