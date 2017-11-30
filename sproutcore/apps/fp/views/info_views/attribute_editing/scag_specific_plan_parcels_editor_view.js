/*
 * UrbanFootprint v1.5
 * Copyright (C) 2016 Calthorpe Analytics
 *
 * This file is part of UrbanFootprint version 1.5
 *
 * UrbanFootprint is distributed under the terms of the GNU General
 * Public License version 3, as published by the Free Software Foundation. This
 * code is distributed WITHOUT ANY WARRANTY, without implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
 * Public License v3 for more details; see <http://www.gnu.org/licenses/>.
 */

sc_require('properties/plural_property');
sc_require('views/info_views/select_info_view');
sc_require('views/info_views/editable_text_field_view');

Footprint.SpecificPlanParcelsEditorView = SC.View.extend({
    classNames: ['footprint-specific-plan-editor-view'],
    childViews: ['densityRangeView', 'yearAdoptView', 'spCodeView',
                 'spNameView', 'specificPlanView', 'secondarySpecificPlanView',
                 'commentView'],

    activeLayer: null,
    activeLayerBinding: SC.Binding.oneWay('Footprint.layerActiveController.content'),

    content: null,
    contentBinding: SC.Binding.oneWay('Footprint.featuresEditController.content'),

    densityRangeView: SC.View.extend({
        childViews: ['titleView', 'densityView', 'lowView', 'highView'],
        layout: {height: 65, left: 10, right: 30, top: 20},
        backgroundColor: 'lightblue',
        content: null,
        contentBinding: SC.Binding.oneWay('.parentView.content'),

        titleView: SC.LabelView.extend({
            classNames: "footprint-bold-title-white-view".w(),
            layout: {height: 16},
            textAlign: SC.ALIGN_CENTER,
            backgroundColor: '#3366CC',
            value: 'Specific Plan Densities'
        }),

        densityView: Footprint.EditableTextFieldView.extend({
            layout: {left: 5, width: 70, top: 20, height: 40},
            title: 'Density',
            isEditable:YES,
            contentBinding: SC.Binding.oneWay('.parentView.content'),
            titleViewLayout: { top: 26, height: 16 },
            editableContentViewLayout: { height: 20 },
            titleClassNames: ['footprint-editable-9font-title-view'],
            contentValueKey: 'density',
            value: Footprint.pluralContentValueProperty,
            isNumber: YES,
            significantDigits: 2
        }),

        lowView: Footprint.EditableTextFieldView.extend({
            layout: {width: 70, top: 20, left: 82, height: 40},
            title: 'Low',
            isEditable:YES,
            contentBinding: SC.Binding.oneWay('.parentView.content'),
            titleViewLayout: { top: 26, height: 16 },
            editableContentViewLayout: { height: 20 },
            titleClassNames: ['footprint-editable-9font-title-view'],
            contentValueKey: 'low',
            value: Footprint.pluralContentValueProperty,
            isNumber: YES,
            significantDigits: 2
        }),

        highView: Footprint.EditableTextFieldView.extend({
            layout: {width: 70, top: 20, right: 5, height: 40},
            title: 'High',
            isEditable:YES,
            contentBinding: SC.Binding.oneWay('.parentView.content'),
            titleViewLayout: { top: 26, height: 16 },
            editableContentViewLayout: { height: 20 },
            titleClassNames: ['footprint-editable-9font-title-view'],
            contentValueKey: 'high',
            value: Footprint.pluralContentValueProperty,
            isNumber: YES,
            significantDigits: 2
        })
    }),

    yearAdoptView: Footprint.EditableTextFieldView.extend({
        layout: {left: 10, width: 100, top: 105, height: 40},
        title: 'Year Adopted',
        isEditable:YES,
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        titleViewLayout: { height: 16 },
        editableContentViewLayout: { top: 17 },
        titleClassNames: ['footprint-bold-title-white-view'],
        contentValueKey: 'year_adopted',
        value: Footprint.pluralContentValueProperty,
        backgroundColor: '#3366CC'
    }),

    spCodeView: Footprint.EditableTextFieldView.extend({
        layout: {left: 10, right: 30, top: 165, height: 40},
        title: '2016 City Specific Plan Code',
        isEditable:YES,
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        titleViewLayout: { height: 16 },
        editableContentViewLayout: { top: 17 },
        titleClassNames: ['footprint-bold-title-white-view'],
        contentValueKey: 'city_sp_code16',
        value: Footprint.pluralContentValueProperty,
        backgroundColor: '#3366CC'
    }),

    spNameView: Footprint.EditableTextFieldView.extend({
        layout: {left: 10, right: 30, top: 225, height: 40},
        title: '2016 SCAG Specific Plan Name',
        isEditable:YES,
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        titleViewLayout: { height: 16 },
        editableContentViewLayout: { top: 17 },
        titleClassNames: ['footprint-bold-title-white-view'],
        contentValueKey: 'sp_name',
        value: Footprint.pluralContentValueProperty,
        backgroundColor: '#3366CC'
    }),

    specificPlanView: SC.View.extend({
        childViews: ['specificPlanTitleView', 'specificPlanSelectView'],
        layout: {height: 40, left: 10, right: 30, top: 285},
        contentBinding: SC.Binding.oneWay('.parentView.content'),

        specificPlanTitleView: SC.LabelView.extend({
            classNames: ['footprint-bold-title-white-view'],
            textAlign: SC.ALIGN_CENTER,
            backgroundColor: '#3366CC',
            layout: {height: 16},
            value: '2016 SCAG Specific Plan'
        }),

        specificPlanSelectView: Footprint.SelectInfoView.extend({
            layout: {height: 24, top: 16},
            contentBinding: SC.Binding.oneWay('Footprint.clientLandUseDefinitionController.arrangedObjects'),

            // Controller and View selection remain in sync
            selectionBinding: 'Footprint.clientLandUseDefinitionController.selection',
            recordType: Footprint.ClientLandUseDefinition,
            itemTitleKey: 'land_use_description',
            menuWidth: 400,
            contentKey: 'features',
            contentStatusKey: 'featuresStatus',
            // The controller calls propertyDidChange on this when updates finish. We use it to update value
            refreshValue: null,
            refreshValueBinding: SC.Binding.oneWay('Footprint.featuresEditController.recordsDidUpdate'),
            value: Footprint.pluralContentValuePropertyCreator('features', 'featuresStatus', 'land_use_definition', 'refreshValue'),
            features: null,
            featuresBinding: SC.Binding.oneWay('.parentView.content'),
            featuresStatus: null,
            featuresStatusBinding: SC.Binding.oneWay("*features.status"),
            // The value updates the singleSelection of the controller (which updates the selection of Controller and View)
            // Changing the selection in turn updates the value, which causes all current features values to update
            valueBinding: 'Footprint.clientLandUseDefinitionController.singleSelection'
        })

    }),

    secondarySpecificPlanView: SC.View.extend({
        childViews: ['specificPlanTitleView', 'specificPlanSelectView'],
        layout: {height: 40, left: 10, right: 30, top: 345},
        contentBinding: SC.Binding.oneWay('.parentView.content'),

        specificPlanTitleView: SC.LabelView.extend({
            classNames: ['footprint-bold-title-white-view'],
            textAlign: SC.ALIGN_CENTER,
            backgroundColor: '#3366CC',
            layout: {height: 16},
            value: '2016 SCAG Secondary Specific Plan'
        }),

        specificPlanSelectView: Footprint.SelectInfoView.extend({
            layout: {height: 24, top: 16},
            contentBinding: SC.Binding.oneWay('Footprint.clientLandUseDefinitionSecondaryController.arrangedObjects'),

            // Controller and View selection remain in sync
            selectionBinding: 'Footprint.clientLandUseDefinitionSecondaryController.selection',
            recordType: Footprint.ClientLandUseDefinition,
            itemTitleKey: 'land_use_description',
            menuWidth: 400,
            contentKey: 'features',
            contentStatusKey: 'featuresStatus',
            // The controller calls propertyDidChange on this when updates finish. We use it to update value
            refreshValue: null,
            refreshValueBinding: SC.Binding.oneWay('Footprint.featuresEditController.recordsDidUpdate'),
            value: Footprint.pluralContentValuePropertyCreator('features', 'featuresStatus', 'land_use_definition_secondary', 'refreshValue'),
            features: null,
            featuresBinding: SC.Binding.oneWay('.parentView.content'),
            featuresStatus: null,
            featuresStatusBinding: SC.Binding.oneWay("*features.status"),
            // The value updates the singleSelection of the controller (which updates the selection of Controller and View)
            // Changing the selection in turn updates the value, which causes all current features values to update
            valueBinding: 'Footprint.clientLandUseDefinitionSecondaryController.singleSelection'
        })

    }),

    commentView: Footprint.EditableTextFieldView.extend({
        layout: {left: 10, right: 30, height: 100, top: 405},
        title: 'Notes',
        titleClassNames: ['footprint-bold-title-white-view'],
        titleBackgroundColor: '#3366CC',
        titleViewLayout: { height: 17, top: 0 },
        isTextArea: YES,
        isEditable:YES,
        contentBinding: SC.Binding.oneWay('.parentView.content'),
        editableContentViewLayout: { top: 17, bottom: 0 },
        contentValueKey: 'notes',
        // The controller calls propertyDidChange on this when updates finish. We use it to update value
        refreshValue: null,
        refreshValueBinding: SC.Binding.oneWay('Footprint.featuresEditController.recordsDidUpdate'),
        value: Footprint.pluralContentValueProperty
    })

});
