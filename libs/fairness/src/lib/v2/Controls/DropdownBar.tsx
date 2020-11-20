// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { localization } from "@responsible-ai/localization";
import {
  Stack,
  Dropdown,
  IDropdownOption,
  IDropdownStyles
} from "office-ui-fabric-react";
import React from "react";

import { IFairnessContext } from "../../util/IFairnessContext";
import {
  IPerformancePickerPropsV2,
  IFairnessPickerPropsV2,
  IFeatureBinPickerPropsV2
} from "../FairnessWizard";

import { DropdownBarStyles } from "./DropdownBarStyles";

export interface IDropdownBarProps {
  dashboardContext: IFairnessContext;
  performancePickerProps: IPerformancePickerPropsV2;
  fairnessPickerProps: IFairnessPickerPropsV2;
  featureBinPickerProps: IFeatureBinPickerPropsV2;
  parentPerformanceChanged: {
    (_ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void;
  };
  parentFairnessChanged: {
    (_ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void;
  };
  parentFeatureChanged: {
    (_ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void;
  };
}

export class DropdownBar extends React.PureComponent<IDropdownBarProps> {
  public render(): React.ReactNode {
    const styles = DropdownBarStyles();

    const featureOptions: IDropdownOption[] = this.props.dashboardContext.modelMetadata.featureNames.map(
      (x) => {
        return { key: x, text: x };
      }
    );
    const performanceDropDown: IDropdownOption[] = this.props.performancePickerProps.performanceOptions.map(
      (x) => {
        return { key: x.key, text: x.title };
      }
    );
    const fairnessDropdown: IDropdownOption[] = this.props.fairnessPickerProps.fairnessOptions.map(
      (x) => {
        return { key: x.key, text: x.title };
      }
    );

    const dropdownStyles: Partial<IDropdownStyles> = {
      dropdown: { width: 180 },
      title: { borderRadius: "5px" }
    };

    return (
      <div className={styles.headerOptions}>
        <Stack horizontal={true}>
          <Dropdown
            id="sensitiveFeatureDropdown"
            label={localization.Fairness.DropdownHeaders.sensitiveFeature}
            className={styles.dropDown}
            defaultSelectedKey={
              this.props.dashboardContext.modelMetadata.featureNames[
                this.props.featureBinPickerProps.selectedBinIndex
              ]
            }
            options={featureOptions}
            disabled={false}
            onChange={this.props.parentFeatureChanged}
            styles={dropdownStyles}
          />
          <Dropdown
            id="performanceMetricDropdown"
            label={localization.Fairness.DropdownHeaders.performanceMetric}
            className={styles.dropDown}
            defaultSelectedKey={
              this.props.performancePickerProps.selectedPerformanceKey
            }
            options={performanceDropDown}
            disabled={false}
            onChange={this.props.parentPerformanceChanged}
            styles={dropdownStyles}
          />
          <Dropdown
            id="fairnessMetricDropdown"
            label={localization.Fairness.DropdownHeaders.fairnessMetric}
            className={styles.dropDown}
            defaultSelectedKey={
              this.props.fairnessPickerProps.selectedFairnessKey
            }
            options={fairnessDropdown}
            disabled={false}
            onChange={this.props.parentFairnessChanged}
            styles={dropdownStyles}
          />
        </Stack>
      </div>
    );
  }
}